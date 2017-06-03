import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeagueService } from '../../../services';

@Component({
  selector: 'join-league-form',
  template: `
    <form [formGroup]="joinLeagueForm" (ngSubmit)="onSubmit(joinLeagueForm.value)">

      <div class="form__group form__group--input">
        <label for="code">League Code</label>
        <input type="text" id="name" [formControl]="joinLeagueForm.controls['code']">
        <span *ngIf="joinLeagueForm.controls['code'].hasError('required') && joinLeagueForm.controls['code'].touched">Required field</span>
      </div>

      <div class="form__group form__group--submit">
        <button type="submit" [disabled]="!joinLeagueForm.valid">Submit</button>
      </div>

      <div *ngIf="serverError" class="form__group form__group--server-error">
        {{ serverError }}
      </div>

    </form>
  `
})
export class JoinLeagueForm {

  joinLeagueForm: FormGroup;
  public serverError: string;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private leagueService: LeagueService
  ) {
    this.joinLeagueForm = fb.group({
      'code': ['', Validators.required]
    });
  }

  onSubmit(value: any) {
    this.serverError = null;
    this.leagueService.joinLeague(value.code)
      .subscribe(
      ( league ) => this.router.navigate(['app/league/'+league._id]),
      ( error ) => this.serverError = error
    );
  }
}
