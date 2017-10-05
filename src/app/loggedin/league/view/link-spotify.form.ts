import { Component, Input } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'link-spotify-form',
  template: `
    <div *ngIf="!linkedToSpotify">
      <p>This league requires you have a Spotify account</p>
      <button (click)="signIntoSpotify()">Link to Spotify</button>
    </div>
    <div *ngIf="linkedToSpotify">
      <p>This league will use your Spotify account</p>
    </div>
  `
})
export class LinkSpotifyForm {

  private linkedToSpotify: Boolean = false;

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService
  ){

    let self = this;
    authService.user.subscribe( (user:User) => {
      user.mediaSource.map(function(_mediaSource) {
        if(_mediaSource.source === 'spotify'){
          self.linkedToSpotify = true;
        }
      })
    });
  }

  signIntoSpotify() {
    this.spotifyService.signIntoSpotify().subscribe( (spotifyAuthUri) => {
      window.location.href = spotifyAuthUri;
    }, (error) => {
      console.log(error);
    });
  }
}
