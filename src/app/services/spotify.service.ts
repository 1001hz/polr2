import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';

@Injectable()
export class SpotifyService {

  private headers: Headers;

  constructor(
    private http: Http,
    private apiService: ApiService
  ) {

  }

  signIntoSpotify() {
    return this.apiService.apiGet('/api/spotify/login', true)
      .map( (response) => {
        console.log(response);
        return response.spotifyAuthUri;
      });
  }

  searchByArtist(query: string) {

    let params:string = [
      `q=${query}`,
      `type=artist`
    ].join("&");

    let queryURL = `https://api.spotify.com/v1/search?${params}`;

    this.headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: this.headers });

    return this.http.get(queryURL, options)
      .map((res:Response) => res.json())
      .catch( error => Observable.throw(error.json().message || 'Server error'));

  }

  searchByAlbum(query: string) {

    let params:string = [
      `q=${query}`,
      `type=album`
    ].join("&");

    let queryURL = `https://api.spotify.com/v1/search?${params}`;

    this.headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: this.headers });

    return this.http.get(queryURL, options)
      .map((res:Response) => res.json())
      .catch( error => Observable.throw(error.json().message || 'Server error'));

  }

}

export const SPOTIFY_PROVIDERS: Array<any> = [
  SpotifyService
];
