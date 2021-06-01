import EventEmmiter from 'events';
import axios from 'axios';
import { DOMAIN } from '../constants/constants';
import { useWs } from './ws';

export default class Transaction extends EventEmmiter {
  constructor(
    txid,
    network,
    confirmations = 0,
    success = false,
    blockHeight = 0
  ) {
    super();
    this.confirmations = confirmations;
    this.blockHeight = blockHeight;
    this.success = success;
    this.txid = txid;
    this.network = network;
    // this.ws = useWs(network);
    this.init();
  }

  async init() {
    this.onConfirmed = this.onConfirmed.bind(this);
    // eslint-disable-next-line no-console
    this.on('error', (err) => console.warn('tx error', err));
    if (this.confirmations === 0) {
      await this.updateInfo();
    }
    if (!this.confirmed) {
      this.ws.$subscribe(
        'transaction/' + this.txid,
        'transaction/confirm',
        this.onConfirmed
      );
      this.ws.on('reconnect', async () => {
        await this.updateInfo();
        if (this.confirmed) {
          this.onConfirmed();
        }
      });
    } else {
      this.onConfirmed();
    }
  }

  confirm() {
    if (this.confirmations > 0) {
      return true;
    }
    return new Promise((resolve) => {
      this.on('confirmed', resolve);
    });
  }

  get confirmed() {
    return this.confirmations > 0;
  }

  async onConfirmed() {
    // console.log('confirmed!!!');
    await this.updateInfo();
    this.emit('confirmed');
    this.ws.$unsubscribe(
      'transaction/' + this.txid,
      'transaction/confirm',
      this.onConfirmed
    );
  }

  async updateInfo() {
    try {
      const info = await axios
        .get(`https://${DOMAIN[this.network]}/api/tx/${this.txid}`)
        .then((res) => res.data);
      this.blockHeight = info.blockHeight;
      this.confirmations = info.confirmations;
      this.success = info.outputs[0].receipt?.excepted === 'None';
      return info;
    } catch (e) {}
  }

  toJSON() {
    return {
      blockHeight: this.blockHeight,
      confirmations: this.confirmations,
      success: this.success,
      txid: this.txid,
      network: this.network,
    };
  }
}
