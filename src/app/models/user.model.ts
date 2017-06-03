export class User {

  public _id: string;
  public token: string;
  public lastLogin: string;
  public fname: string;
  public lname: string;
  public email: string;
  public avatar: any;

  constructor() {
    this.avatar = {
      url: null,
      source: null
    };
  }

  setFname(val) {
    this.fname = val;
  }

  setLname(val) {
    this.lname = val;
  }

  makeFromApiData(response) {
    this._id = response._id;
    this.email = response.email;
    this.fname = response.fname ? response.fname : '';
    this.lname = response.lname ? response.lname : '';
    this.token = response.token ? response.token : '';
    this.lastLogin = response.lastLogin ? response.lastLogin : '';

    this.avatar.url = response.avatar.url ? response.avatar.url : 'http://www.fillmurray.com/100/100';
    this.avatar.source = response.avatar.source;
  }
}
