import EventEmmiter from 'events';
// import { ref } from '@nuxtjs/composition-api'

// import {
//   ABI,
//   ROUTER,
//   FACTORY,
//   MAX_UINT_256,
//   ZERO_ADDRESS,
//   TYPE_APPROVE,
//   DOMAIN,
//   NETWORK,
//   INSIGHT_DOMAIN,
// } from './constants';

export const MESSAGE_TYPE = {
    QRYPTO_INSTALLED_OR_UPDATED: 'QRYPTO_INSTALLED_OR_UPDATED',
    QRYPTO_ACCOUNT_CHANGED: 'QRYPTO_ACCOUNT_CHANGED',
};

export default class ALTMASK extends EventEmmiter {
    extensionId;
    extensionInstalled = false;
    account = null;
    #qrypto = null;
    #opened = false;

    constructor(extensionId) {
        super();
        this.extensionId = extensionId;
    }

    init() {
        window.postMessage({ message: { type: 'CONNECT_HTMLCOINCHROME' } }, '*');
        window.addEventListener('message', this.handleMessage.bind(this), true);
        this.on('error', (err) => {
            // eslint-disable-next-line no-console
            console.warn('Something wrong', err);
        });
        this.checkInstalled();
    }

    handleMessage(event) {
        const { target, message } = event.data;
        console.log('kevin target, message', event.data)
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
                this.#qrypto = window.qrypto;
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

    login() {
        return new Promise((resolve, reject) => {
            this.once('login', (account) => resolve(account));
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

let qrypto = null;

export const useQrypto = (extensionId) => {
    if (qrypto === null) {
        qrypto = new ALTMASK(extensionId);
        if (!process.server) {
            qrypto.init();
        }
    }
    return qrypto;
};
