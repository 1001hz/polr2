import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NEW_LEAGUE_COMPONENTS } from './new';
import { EDIT_LEAGUE_COMPONENTS } from './edit';
import { JOIN_LEAGUE_COMPONENTS } from './join';
import { VIEW_LEAGUE_COMPONENTS } from './view';
import { PICK_COMPONENTS } from './pick';
import { LEAGUE_LIST_COMPONENTS } from './list';

import { ROUTES } from './league.routes';

import { DatePickerComponent } from '../../components/datepicker.component';

@NgModule({
  declarations: [
    ...NEW_LEAGUE_COMPONENTS,
    ...EDIT_LEAGUE_COMPONENTS,
    ...JOIN_LEAGUE_COMPONENTS,
    ...VIEW_LEAGUE_COMPONENTS,
    ...PICK_COMPONENTS,
    ...LEAGUE_LIST_COMPONENTS,
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
