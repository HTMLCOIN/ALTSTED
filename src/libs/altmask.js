
import EventEmmiter from 'events';
import html from 'htmlcoinjs-lib';
import abi from 'ethjs-abi';
import BigNumber from 'bignumber.js';
import axios from 'axios';
import { sortTokens } from './utils';
import { useCache, usePersist } from './cache';
import Transaction from './transaction';

import {
    ABI,
    ROUTER,
    FACTORY,
    MAX_UINT_256,
    ZERO_ADDRESS,
    TYPE_APPROVE,
    DOMAIN,
    NETWORK,
    INSIGHT_DOMAIN,
} from 'constants/constants';

export const MESSAGE_TYPE = {
    QRYPTO_INSTALLED_OR_UPDATED: 'ALTMASK_INSTALLED_OR_UPDATED',
    QRYPTO_ACCOUNT_CHANGED: 'ALTMASK_ACCOUNT_CHANGED',
};

class CallContractError extends Error { }
export default class ALTMASK extends EventEmmiter {
    extensionId;
    extensionInstalled = false;
    account = null;
    #altmask = null;
    #opened = false;

    constructor(extensionId) {
        super();
        this.extensionId = extensionId;
    }

    init() {
        window.postMessage({ message: { type: 'CONNECT_ALTMASK' } }, '*');
        window.addEventListener('message', this.handleMessage.bind(this), true);
        this.on('error', (err) => {
            // eslint-disable-next-line no-console
            console.warn('Something wrong', err);
        });
        console.log('kevin extensionId===>', window)
        this.checkInstalled();
    }
    setExtensionId(extensionId) {
        this.extensionId = extensionId;
        this.checkInstalled();
    }

    get rpcProvider() {
        return this.#altmask?.rpcProvider;
    }

    get connected() {
        return this.#altmask !== null;
    }

    get loggedIn() {
        return this.account?.loggedIn === true;
    }

    get hexAddress() {
        return this.account?.address
            ? html.address.fromBase58Check(this.account.address).hash.toString('hex')
            : '';
    }

    get router() {
        return ROUTER[NETWORK[this.account?.network] ?? NETWORK.MainNet];
    }

    get factory() {
        return FACTORY[NETWORK[this.account?.network] ?? NETWORK.MainNet];
    }


    handleMessage(event) {
        const { target, message } = event.data;
        if (target !== 'altmask-inpage') {
            return;
        }
        const { payload, type } = message || {};
        if (payload.error) {
            this.emit('error', payload.error);
            return;
        }
        this.extensionInstalled = true
        this.emit('installed', true)
        switch (type) {
            case MESSAGE_TYPE.QRYPTO_INSTALLED_OR_UPDATED:
                window.location.reload();
                break;
            case MESSAGE_TYPE.QRYPTO_ACCOUNT_CHANGED:
                this.#altmask = window.qrypto;
                this.account = payload.account;
                this.emit('account', this.account);
                switch (true) {
                    case payload.statusChangeReason.includes('Connected'):
                        this.emit('connected', true);
                        break;
                    case payload.statusChangeReason.includes('Logged In'):
                        if (this.#opened) {
                            window.chrome.runtime?.sendMessage(this.extensionId, {
                                type: 'CLOSE',
                            });
                        }
                        this.emit('login', this.account);
                        break;
                    case payload.statusChangeReason.includes('Logged Out'):
                        this.emit('logout');
                        break;
                }
                break;
        }
    }

    wrapHex(hex) {
        return '0x' + hex;
    }

    unwrapHex(hex) {
        return hex?.slice(2);
    }

    getTokenBalance(token, forceUpdate = false) {
        if (!this.loggedIn || !token) {
            return BigNumber(0);
        }

        // return useCache(
        //     ['balanceOf', token, this.hexAddress],
        //     () =>
        //         this.return(token.address, ABI.QRC20, 'balanceOf', [
        //             this.wrapHex(this.hexAddress),
        //         ]),
        //     600,
        //     forceUpdate
        // );
    }

    getTotalSupply(token, forceUpdate = false) {
        // return useCache(
        //     ['totalSupply', token],
        //     () => this.return(token.address, ABI.QRC20, 'totalSupply'),
        //     600,
        //     forceUpdate
        // );
    }

    swap(method, params, value = 0, { gasLimitPlus = 0 } = {}) {
        return this.safeSendToContract(this.router, ABI.ROUTER, method, params, {
            qtumAmount: value,
            gasLimitPlus,
        });
    }

    async getPair(tokenA, tokenB) {
        [tokenA, tokenB] = sortTokens(tokenA, tokenB);
        // const pair = await usePersist(
        //     ['getPair', this.factory, tokenA, tokenB],
        //     async () => {
        //         const pair = this.unwrapHex(
        //             await this.return(this.factory, ABI.FACTORY, 'getPair', [
        //                 this.wrapHex(tokenA.address),
        //                 this.wrapHex(tokenB.address),
        //             ])
        //         );
        //         return pair === ZERO_ADDRESS ? undefined : pair;
        //     }
        // );
        // return pair || ZERO_ADDRESS;
    }

    async getAmountsIn(amountOut, [tokenA, tokenB]) {
        const reserves = await this.getReserves(tokenA, tokenB);
        const amountIn = this.getAmountIn(amountOut, reserves[0], reserves[1]);
        return [amountIn, amountOut];
    }

    async getAmountsOut(amountIn, [tokenA, tokenB]) {
        const reserves = await this.getReserves(tokenA, tokenB);
        const amountOut = this.getAmountOut(amountIn, reserves[0], reserves[1]);
        return [amountIn, amountOut];
    }

    getAmountIn(amountOut, reserveIn, reserveOut) {
        if (amountOut.eq(0) || reserveIn.eq(0) || reserveOut.eq(0)) {
            return BigNumber(0);
        }
        const numerator = reserveIn.times(amountOut).times(1000);
        const denominator = reserveOut.minus(amountOut).times(997);
        return numerator.div(denominator).plus(1);
    }

    getAmountOut(amountIn, reserveIn, reserveOut) {
        if (amountIn.eq(0) || reserveIn.eq(0) || reserveOut.eq(0)) {
            return BigNumber(0);
        }
        // amountOut = reserveOut / (0.997 * reserveIn / amount + 1)
        // amount -> ∞ => out -> reserveOut
        const amountInWithFee = amountIn.times(997);
        const numerator = amountInWithFee.times(reserveOut);
        const denominator = reserveIn.times(1000).plus(amountInWithFee);
        return numerator.idiv(denominator);
    }

    async getReserves(tokenA, tokenB, forceUpdate = false) {
        const [token0, token1] = sortTokens(tokenA, tokenB);
        // try {
        //     const [reserve0, reserve1] = await useCache(
        //         ['getReserves', tokenA, tokenB],
        //         () => {
        //             return this.return(this.router, ABI.ROUTER, 'getReserves', [
        //                 this.wrapHex(this.factory),
        //                 this.wrapHex(token0.address),
        //                 this.wrapHex(token1.address),
        //             ]);
        //         },
        //         600,
        //         forceUpdate
        //     );
        //     return token0 === tokenA ? [reserve0, reserve1] : [reserve1, reserve0];
        // } catch (e) {
        //     return [BigNumber(0), BigNumber(0)];
        // }
    }

    async shouldApprove(token) {
        const allowance = await this.allowance(token);
        return BigNumber(allowance).eq(0);
    }

    allowance(token) {
        // return useCache(['allowance', token.address], () =>
        //     this.return(token.address, ABI.QRC20, 'allowance', [
        //         this.wrapHex(this.hexAddress),
        //         this.wrapHex(this.router),
        //     ])
        // );
    }

    async tryToApprove(token, amount) {
        if (amount.eq(0)) {
            return true;
        }
        const allowance = await this.allowance(token);
        if (BigNumber(allowance).gte(amount)) {
            return true;
        }
        // need to set it to 0 first
        // see https://github.com/qtumproject/QRC20Token/blob/master/QRC20Token.sol#L68
        if (BigNumber(allowance).gt(0)) {
            const tx = await this.approve(token, 0);
            await tx.confirm();
        }
        const tx = await this.approve(token, MAX_UINT_256);
        this.emit('tx', {
            type: TYPE_APPROVE,
            token,
            amount: MAX_UINT_256,
            raw: tx,
        });
        return tx;
    }

    approve(token, amount) {
        return this.sendToContract(token.address, ABI.QRC20, 'approve', [
            this.wrapHex(this.router),
            amount,
        ]);
    }

    async rpcCall(method, params = []) {
        if (!this.rpcProvider) {
            throw new Error("RPC Provider doess't exists");
        }
        return await this.rpcProvider.rawCall(method, params);
    }

    getAbiMethod(abiList, abiName) {
        // abiList = usePersist(['getAbiMethod', abiList], () =>
        //     Object.fromEntries(abiList.map((abi) => [abi.name, abi]))
        // );
        // return abiList[abiName];
    }

    async sendToContract(
        address,
        abiList,
        abiName,
        params = [],
        { qtumAmount = 0, gasLimit = 250000, gasPrice = 40 } = {}
    ) {
        const method = this.getAbiMethod(abiList, abiName);
        const data = this.encodeMethod(method, params);
        try {
            this.emit('txWaiting');
            const { txid } = await this.rpcCall('sendtocontract', [
                address,
                data,
                qtumAmount,
                gasLimit,
                gasPrice,
            ]);
            this.emit('txSent');
            return new Transaction(txid, this.account.network);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('sendtocontract error', e);
            return null;
        }
    }

    async safeSendToContract(
        address,
        abiList,
        abiName,
        params = [],
        options = {}
    ) {
        try {
            this.emit('txValidating');
            const result = await this.callContractWithAmount(
                address,
                abiList,
                abiName,
                params,
                {
                    amount: options.qtumAmount,
                }
            );
            if (result.executionResult.excepted !== 'None') {
                this.emit('txCancelled');
                throw new CallContractError(result.executionResult.exceptedMessage);
            }
            const { gasUsed } = result.executionResult;
            const tx = await this.sendToContract(address, abiList, abiName, params, {
                ...options,
                gasLimit: Math.ceil(gasUsed * 1.1) + options.gasLimitPlus,
            });
            return tx;
        } catch (e) {
            alert(e.message);
        }
    }

    async callContractQtumInfo(address, abiList, abiName, params = []) {
        const method = this.getAbiMethod(abiList, abiName);
        const data = this.encodeMethod(method, params);
        const { data: result } = await axios.get(
            `https://${DOMAIN[this.account.network || NETWORK.MainNet]
            }/api/contract/${address}/call`,
            {
                params: {
                    data,
                    address: this.hexAddress,
                },
            }
        );
        if (result.executionResult.excepted === 'None') {
            const output = result.executionResult.output;
            const decoded = abi.decodeMethod(method, this.wrapHex(output));
            return decoded;
        }
        throw new CallContractError(result.executionResult.exceptedMessage);
    }

    async callContractWithAmount(
        address,
        abiList,
        abiName,
        params = [],
        options = {}
    ) {
        const method = this.getAbiMethod(abiList, abiName);
        const data = this.encodeMethod(method, params);
        // console.log(JSON.stringify(method), JSON.stringify(params));
        try {
            const { data: result } = await axios.post(
                `https://${INSIGHT_DOMAIN[this.account.network || NETWORK.MainNet]
                }/insight-api/contracts/call`,
                {
                    data,
                    address,
                    from: this.hexAddress,
                    ...options,
                }
            );
            return result;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('callcontract error', {
                abiName,
                params,
                e,
            });
            return null;
        }
    }

    async callContract(address, abiList, abiName, params = []) {
        const method = this.getAbiMethod(abiList, abiName);
        const data = this.encodeMethod(method, params);
        try {
            const result = await this.rpcCall('callcontract', [address, data]);
            if (result.executionResult.excepted === 'None') {
                const output = result.executionResult.output;
                const decoded = abi.decodeMethod(method, this.wrapHex(output));
                return decoded;
            }
            throw new CallContractError(result.executionResult.exceptedMessage);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('callcontract error', {
                abiName,
                params,
                e,
            });
            if (e instanceof CallContractError) {
                throw e;
            }
            return null;
        }
    }

    async return(address, abiList, abiName, params = []) {
        const callResults = await this.callContractQtumInfo(
            address,
            abiList,
            abiName,
            params
        );
        if (callResults === null) {
            return null;
        }
        const method = this.getAbiMethod(abiList, abiName);
        const results = [];
        for (let i = 0; i < method.outputs.length; i++) {
            results.push(this.parseData(callResults[i]));
        }
        return results.length > 1 ? results : results[0];
    }

    parseData(data) {
        // use bignumber.js instead of stupid bn.js
        if (
            data !== null &&
            typeof data === 'object' &&
            Array.isArray(data.words)
        ) {
            return BigNumber(data);
        }
        if (Array.isArray(data)) {
            return data.map((d) => this.parseData(d));
        }
        return data;
    }

    encodeMethod(method, params) {
        return abi.encodeMethod(method, params).substr(2);
    }

    login() {
        return new Promise((resolve, reject) => {
            this.once('login', (account) => resolve(account));
            console.log('kevin wallt login area ===>', window.chrome)
            window.chrome.runtime?.sendMessage(
                this.extensionId,
                { type: 'OPEN' },
                (res) => {
                    this.#opened = !window.chrome.runtime.lastError;
                }
            );
        });
    }

    checkInstalled() {
        if (this.extensionInstalled) {
            return true;
        }
        return new Promise((resolve, reject) => {
            console.log('kevin extensionInstalled===>', window.chrome.runtime)
            window.chrome.runtime?.sendMessage(
                this.extensionId,
                { type: 'GET_BALANCE' },
                (res) => {
                    const installed = !window.chrome.runtime.lastError;
                    this.emit('installed', installed);
                    this.extensionInstalled = installed;
                    resolve(installed);
                }
            );
            setTimeout(() => resolve(false), 1000);
        });
    }
}

let altmask = null;

export const useQrypto = (extensionId) => {
    if (altmask === null) {
        altmask = new ALTMASK(extensionId);
        if (!process.server) {
            altmask.init();
        }
    }
    return altmask;
};
