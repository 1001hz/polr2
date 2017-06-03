export class Message {

  public _id: string;
  public type: string;
  public text: string;

  constructor(message, type) {
    this.text = message;
    this.type = type;
    this._id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
  }
}
