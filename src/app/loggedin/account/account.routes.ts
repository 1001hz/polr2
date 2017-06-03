import { ManageAccountComponent } from './manage/manageAccount.component';
import { ManagePasswordComponent } from './manage/managePassword.component';

export const ROUTES = [
  { path: '', component: ManageAccountComponent },
  { path: 'password', component: ManagePasswordComponent }
];
