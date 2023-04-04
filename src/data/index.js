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
    console.log((Date.now() - time) / 1000);
    return response;
  }
  static async getSubmissionsByDuelIdAndUid(id, uid) {
    let res = await this._getModel(`general/playerduelsubmissions/${id}/${uid}`);
    if (res?.submissions) return res.submissions;
    else console.log("Couldn't get submissions.");
    return [];
  }

  static async addDuel(params) {
    const duel = await fetch(`${backendOrigin}/duels/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(
      res => res.json()
    ).catch((err) => console.log(err));
    return duel;
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

  static async addPlayer() {
    const player = await fetch(`${backendOrigin}/players/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      res => res.json()
    ).catch((err) => console.log(err));
    return player;
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