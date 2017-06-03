import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NEW_LEAGUE_COMPONENTS } from './new';
import { EDIT_LEAGUE_COMPONENTS } from './edit';
import { JOIN_LEAGUE_COMPONENTS } from './join';
import { VIEW_LEAGUE_COMPONENTS } from './view';
import { HOME_COMPONENTS } from '../home';

import { ROUTES } from './league.routes';

import { DatePickerComponent } from '../../components/datepicker.component';

@NgModule({
  declarations: [
    ...NEW_LEAGUE_COMPONENTS,
    ...EDIT_LEAGUE_COMPONENTS,
    ...JOIN_LEAGUE_COMPONENTS,
    ...VIEW_LEAGUE_COMPONENTS,
    ...HOME_COMPONENTS,
    DatePickerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class LeagueModule{}
