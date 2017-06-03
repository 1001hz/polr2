import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Rx';

interface AppState {
  user: User;
}

@Injectable()
export class ApiService {

  private apiUrl: string;
  private headers: Headers;
  private token: string;

  constructor(
    private store: Store<AppState>,
    public http: Http
  ) {
    this.apiUrl = 'http://localhost:3001';

    // get user for API token parameter
    store.select('user').subscribe( (u:User) => {
      this.token = u.token
    } );
  }

  apiGet(endpoint, isPrivate:boolean = true) {

    this.headers = new Headers({ 'Content-Type': 'application/json' });
    if(isPrivate && this.token) {
      // protected routes need token
      this.headers.append('X-Auth-Token', this.token);
    }

    let options = new RequestOptions({ headers: this.headers });

    return this.http.get(this.apiUrl + endpoint, options)
      .map((res:Response) => res.json())
      .catch( error => Observable.throw(error.json().message || 'Server error'));
  }

  apiPost(endpoint, data, isPrivate:boolean = true) {

    this.headers = new Headers({ 'Content-Type': 'application/json' });

    if(isPrivate && this.token) {
      // protected routes need token
      this.headers.append('X-Auth-Token', this.token);
    }

    let payload = JSON.stringify(data); // Stringify payload

    let options = new RequestOptions({ headers: this.headers });



    return this.http.post(this.apiUrl + endpoint, payload, options)
      .map((res:Response) => res.json())
      .catch( error => Observable.throw(error.json().message || 'Server error'));
  }

  apiPut(endpoint, data, isPrivate:boolean = true) {

    this.headers = new Headers({ 'Content-Type': 'application/json' });
    if(isPrivate && this.token) {
      // protected routes need token
      this.headers.append('X-Auth-Token', this.token);
    }

    let payload = JSON.stringify(data); // Stringify payload

    let options = new RequestOptions({ headers: this.headers });



    return this.http.put(this.apiUrl + endpoint, payload, options)
      .map((res:Response) => res.json())
  }

  apiPostFile(endpoint, formData:FormData) {
    let headers = new Headers();
    //headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    headers.append('X-Auth-Token', this.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + endpoint, formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error));
  }

}

export const API_PROVIDERS: Array<any> = [
  ApiService
];
