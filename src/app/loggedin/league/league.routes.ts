import { NewLeagueComponent } from './new/new-league.component';
import { EditLeagueComponent } from './edit/edit-league.component';
import { JoinLeagueComponent } from './join/join-league.component';
import { ViewLeagueComponent } from './view/view-league.component';
import { PickRoundComponent } from './pick/pick-round.component';
import { LeagueListComponent } from './list/league-list.component';

import { LeaguesResolve } from '../../resolvers/leagues.resolver';
import { EditLeagueGuard } from '../../guards/edit-league.guard';

export const ROUTES = [
  { path: '', component: LeagueListComponent },
  { path: 'new', component: NewLeagueComponent },
  { path: 'join', component: JoinLeagueComponent },
  { path: ':leagueId', component: ViewLeagueComponent },
  { path: ':leagueId/edit', component: EditLeagueComponent, canActivate: [EditLeagueGuard] },
  { path: ':leagueId/pick', component: PickRoundComponent },
];
