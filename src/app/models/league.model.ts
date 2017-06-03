import * as moment from 'moment';

export class League {

  public _id: string;
  public name: string;
  public ownerId: string;
  public startDate: any;
  public frequency: number;
  public mediaType: string;
  public nextRoundClosing: string;

  constructor() {
  }

  makeFromApiData(response) {

    this._id = response._id;
    this.name = response.name ? response.name : '';
    this.ownerId = response.ownerId ? response.ownerId : '';
    this.startDate = response.startDate ? response.startDate : '';
    this.frequency = response.frequency ? response.frequency : '';
    this.mediaType = response.mediaType ? response.mediaType : '';

    //this.nextRoundClosing = moment(this.startDate).add(this.frequency,'weeks');
  }

  hasStarted() {
    var sd = moment(parseInt(this.startDate)).format('YYYY-MM-DD');
    var now = moment().format('YYYY-MM-DD');
    return moment(now).isAfter(sd);
  }

}
