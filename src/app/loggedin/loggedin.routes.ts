import { HomeComponent } from './home/home.component';
import { LeaguesResolve } from '../resolvers/leagues.resolver';

export const ROUTES = [
  { path: '',
    component: HomeComponent,
    resolve: {
      league: LeaguesResolve
    }
  },
  { path: 'account', loadChildren: './account#AccountModule' },
  { path: 'league', loadChildren: './league#LeagueModule'}
];
