import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { LoginGuard } from './guards/login.guard';

export const ROUTES: Routes = [
  { path: 'app',  loadChildren: './loggedin#LoggedInModule', canActivate: [LoginGuard] },
  { path: '', loadChildren: './login#LoginModule' },
  { path: '**',    component: NoContentComponent },
];
