import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { LeaguesResolve } from '../resolvers/leagues.resolver';
import { ROUTES } from './loggedin.routes';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    LeaguesResolve
  ]
})
export class LoggedInModule {}
