import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../../services';

@Component({
  selector: 'search-spotify',
  template: `
  <div>
     <input type="text" #newquery
      [value]="query"
      (keydown.enter)="submit(newquery.value)">
      <button (click)="submit(newquery.value)">Search</button>
  </div>
  `
})
export class SearchSpotifyComponent {

  @Input() media: string = "some val";

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
    )
  {

  }



  submit(query) {

    switch(this.media) {
      case "Album":
        this.spotifyService.searchByAlbum(query).subscribe( (res) => {
          console.log(res);
        }, (error) => {
          console.log(error);
        });

      case "Single":
            //TODO: single search
    }


  }
}
