import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { ManageAccountComponent } from './manage/manageAccount.component';
import { AccountDetailsForm } from './manage/accountDetails.form';
import { ChangePasswordForm } from './manage/changePassword.form';
import { ManagePasswordComponent } from './manage/managePassword.component';
import { AccountAvatarComponent } from './manage/accountAvatar.component';

import { ROUTES } from './account.routes';

@NgModule({
  declarations: [
    ManageAccountComponent,
    AccountDetailsForm,
    ChangePasswordForm,
    ManagePasswordComponent,
    AccountAvatarComponent,
    FileSelectDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class AccountModule{}
