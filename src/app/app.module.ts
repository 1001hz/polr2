import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';


/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content';
import { MessageComponent } from './components/message.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

import { ALL_SERVICES } from './services';
//import { LOGIN_GUARD_PROVIDERS } from './guards/login.guard';
import { ALL_GUARDS } from './guards';

import { StoreModule } from "@ngrx/store";
import { userReducer } from './reducers/user.reducer';
import { messageReducer } from './reducers/message.reducer';
import { leagueReducer } from './reducers/league.reducer';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...ALL_SERVICES,
  ...ALL_GUARDS
];

let rootReducer = {
  user: userReducer,
  messages: messageReducer,
  leagues: leagueReducer
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent,
    MessageComponent,
    NavMenuComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    StoreModule.provideStore(rootReducer)
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {



}
