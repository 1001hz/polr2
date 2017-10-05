import * as moment from 'moment';

export class League {

  public _id: string;
  public name: string;
  public ownerId: string;
  public startDate: any;
  public frequency: number;
  public mediaType: string;
  public active: boolean;
  public clientProps: Object;
  public source: string;

  constructor() {
  }

  makeFromApiData(response) {

    this._id = response._id;
    this.name = response.name ? response.name : '';
    this.ownerId = response.ownerId ? response.ownerId : '';
    this.startDate = response.startDate ? response.startDate : '';
    this.frequency = response.frequency ? response.frequency : '';
    this.mediaType = response.mediaType ? response.mediaType : '';
    this.active = response.active !== undefined ? response.active : true;
    this.source = response.source !== undefined ? response.source : '';

    this.clientProps = {
      currentRoundNumber: this._getRound(),
      nextRoundClosing: this._getNextRoundClosing(),
      nextRoundClosingIn: this._getNextRoundClosingIn(),
      hasStarted: this.hasStarted()
    };
  }

  _getRound(): number {
    var mStart = moment(parseInt(this.startDate));
    var mToday = moment();
    return (mToday.diff(mStart, 'weeks') / this.frequency) + 1;
  }

  _getNextRoundClosing() {
    var roundNumber = this._getRound();
    return moment(parseInt(this.startDate)).add(((roundNumber) * this.frequency),'weeks');
  }

  _getNextRoundClosingIn() {
    return this._getNextRoundClosing().fromNow();
  }

  hasStarted(): boolean {
    var sd = moment(parseInt(this.startDate)).format('YYYY-MM-DD');
    var now = moment().format('YYYY-MM-DD');
    return moment(now).isAfter(sd);
  }

}
