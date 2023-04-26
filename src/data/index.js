import backendOrigin from "../config/origins";
import uuid from 'react-uuid';

export default class Database {  
  static async _getModel(model, params) {
    let time = Date.now();
    const response = await fetch(`${backendOrigin}/${model}`, params)
    .then(
      res => res.json()
    ).then(
      json => { return json; }
    ).catch(
      err => {
        console.log(err);
      }
    );
    return response;
  }

  static async getMenuItems() {
    let res = await this._getModel('menu');
    return res;
  }

  static async getMenuItemsForOrder(order_id) {
    let res = await this._getModel(`menu/order/${order_id}`);
    return res;
  }

  static async getInventoryItems() {
    let res = await this._getModel('inventory');
    return res;
  }

  static async getOrders() {
    let res = await this._getModel('orders');
    return res;
  }

  static async getRecentOrders() {
    let res = await this._getModel('orders/recent');
    return res;
  }

  static async addMessage(params) {
    const message = await fetch(`${backendOrigin}/messages/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(
      res => res.json()
    ).catch((err) => console.log(err));
    return message;
  }
}

export const handleUID = () => {
  let uid = localStorage.getItem('uid');
  if (!uid) {
      uid = uuid();
      localStorage.setItem('uid', uid);
  }
}

export const getUID = () => {
  handleUID();
  let uid = localStorage.getItem('uid');
  return uid;
}