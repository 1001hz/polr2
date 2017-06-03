import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HOME_COMPONENTS } from './home';
import { LeaguesResolve } from '../resolvers/leagues.resolver';
import { ROUTES } from './loggedin.routes';

@NgModule({
  declarations: [
    ...HOME_COMPONENTS
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
