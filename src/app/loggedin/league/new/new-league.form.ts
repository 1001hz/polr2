import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeagueService } from '../../../services';
import { LeagueConfig } from '../league.config';

@Component({
  selector: 'new-league-form',
  template: `
    <form [formGroup]="newLeagueForm" (ngSubmit)="onSubmit(newLeagueForm.value)">

      <div class="form__group form__group--input">
        <label for="name">Name</label>
        <input type="text" id="name" [formControl]="newLeagueForm.controls['name']">
        <span *ngIf="newLeagueForm.controls['name'].hasError('required') && newLeagueForm.controls['name'].touched">Required field</span>
      </div>

      <div class="form__group form__group--input">
        <label for="startDate">Start Date</label>
        <input type="date" id="startDate" [formControl]="newLeagueForm.controls['startDate']">
        <span *ngIf="newLeagueForm.controls['startDate'].hasError('required') && newLeagueForm.controls['startDate'].touched">Required field</span>
      </div>

      <div class="form__group form__group--input">
        <label for="frequency">Round Frequency (Weeks)</label>

        <select id="frequency" [formControl]="newLeagueForm.controls['frequency']">
          <option *ngFor="let num of frequencyValues" value="{{num}}">{{num}}</option>
        </select>
        <span *ngIf="newLeagueForm.controls['frequency'].hasError('required') && newLeagueForm.controls['frequency'].touched">Required field</span>
      </div>

      <div class="form__group form__group--input">
        <label for="mediaType">Type</label>

        <select id="mediaType" [formControl]="newLeagueForm.controls['mediaType']">
          <option *ngFor="let type of mediaTypes" value="{{type}}">{{type}}</option>
        </select>
        <span *ngIf="newLeagueForm.controls['mediaType'].hasError('required') && newLeagueForm.controls['mediaType'].touched">Required field</span>
      </div>

      <div class="form__group form__group--submit">
        <button type="submit" [disabled]="!newLeagueForm.valid">Submit</button>
      </div>

      <div *ngIf="serverError" class="form__group form__group--server-error">
        {{ serverError }}
      </div>

    </form>
  `
})
export class NewLeagueForm {

  newLeagueForm: FormGroup;
  public serverError: string;
  public frequencyValues: Array<number>;
  public mediaTypes: Array<string>;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private leagueService: LeagueService
  ) {

    this.newLeagueForm = fb.group({
      'name': ['', Validators.required],
      'startDate': ['', Validators.required],
      'frequency': ['1', Validators.required],
      'mediaType': ['Album', Validators.required]
    });

    this.frequencyValues = LeagueConfig.frequencyValues;
    this.mediaTypes = LeagueConfig.mediaTypes;
  }

  onSubmit(value: any) {
    this.serverError = null;

    this.leagueService.create(value)
      .subscribe(
      ( league ) => this.router.navigate(['app/league/'+league._id]),
      ( error ) => this.serverError = error
    );
  }
}
