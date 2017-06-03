import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../../services';
import { AuthService } from '../../../services';
import { User } from '../../../models/user.model';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'account-avatar',
  template: `
  <img [src]="user.avatar.url" width="60" />
  <span (click)="changeAvatar()">Change</span>
  <div *ngIf="showUpload">
    <input type="file" (change)="fileChange($event)" placeholder="Upload file" accept=".jpg,.png">
  </div>
  `
})
export class AccountAvatarComponent implements OnDestroy{

  public user: User;
  private user$: Subscription;
  public showUpload: boolean;
  private hasChanged: boolean;

  constructor(private authService: AuthService, private userService: UserService) {
    this.user$ = authService.user.subscribe( (user:User) => {
      // get updated user
      this.user = user;

      // make browser fetch image again
      if(this.hasChanged){
        this.user.avatar.url = this.user.avatar.url + '?random+\=' + Math.random();
      }

    });
  }

  changeAvatar(): any {
    this.showUpload = true;
  }

  fileChange(event): any {

    this.hasChanged = true;
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('avatar', file, file.name);

      // send new file data
      this.userService
        .updateAvatar(formData)
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }
}
