import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../../services';
import { LeagueConfig } from '../league.config';
import { League } from '../../../models/league.model';
import { Observable, Subscription } from 'rxjs/Rx'

@Component({
  selector: 'edit-league-form',
  template: `
    <form [formGroup]="editLeagueForm" (ngSubmit)="onSubmit(editLeagueForm.value)">

      <div class="form__group form__group--input">
        <label for="name">Name</label>
        <input type="text" id="name" [formControl]="editLeagueForm.controls['name']">
        <span *ngIf="editLeagueForm.controls['name'].hasError('required') && editLeagueForm.controls['name'].touched">Required field</span>
      </div>

      <date-picker formControlName="startDate"></date-picker>
<!--
      <div class="form__group form__group--input">
        <label for="startDate">Start Date</label>
        <input type="date" id="startDate" [formControl]="editLeagueForm.controls['startDate']">
        <span *ngIf="editLeagueForm.controls['startDate'].hasError('required') && editLeagueForm.controls['startDate'].touched">Required field</span>
      </div>
-->
      <div class="form__group form__group--input">
        <label for="frequency">Round Frequency (Weeks)</label>

        <select id="frequency" [formControl]="editLeagueForm.controls['frequency']">
          <option *ngFor="let num of frequencyValues" value="{{num}}">{{num}}</option>
        </select>
        <span *ngIf="editLeagueForm.controls['frequency'].hasError('required') && editLeagueForm.controls['frequency'].touched">Required field</span>
      </div>

      <div class="form__group form__group--input">
        <label for="mediaType">Type</label>

        <select id="mediaType" [formControl]="editLeagueForm.controls['mediaType']">
          <option *ngFor="let type of mediaTypes" value="{{type}}">{{type}}</option>
        </select>
        <span *ngIf="editLeagueForm.controls['mediaType'].hasError('required') && editLeagueForm.controls['mediaType'].touched">Required field</span>
      </div>

      <div class="form__group form__group--submit">
        <button type="submit" [disabled]="!editLeagueForm.valid">Submit</button>
      </div>

      <div *ngIf="serverError" class="form__group form__group--server-error">
        {{ serverError }}
      </div>

    </form>
  `
})
export class EditLeagueForm implements OnDestroy {

  editLeagueForm: FormGroup;
  public serverError: string;
  public frequencyValues: Array<number>;
  public mediaTypes: Array<string>;
  public hasStarted: boolean;
  private league: League;
  private league$: Subscription;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private leagueService: LeagueService
  ) {

    this.frequencyValues = LeagueConfig.frequencyValues;
    this.mediaTypes = LeagueConfig.mediaTypes;

    route.params.subscribe( params => {

      this.league$ = this.leagueService
        .getById(params['leagueId'])
        .first()
        .subscribe( (league: League) => {

        this.league = league;
        this.hasStarted = league.hasStarted();

        this.editLeagueForm = fb.group({
          'name': [
            league.name,
            Validators.required],
          'startDate': [
            {
              value: league.startDate,
              disabled: this.hasStarted
            },
            Validators.required
          ],
          'frequency': [
            league.frequency,
            Validators.required
          ],
          'mediaType': [
            {
              value: league.mediaType,
              disabled: this.hasStarted
            },
            Validators.required
          ]
        });
      });

    });

  }

  onSubmit(leagueData: any) {
    this.serverError = null;
    leagueData._id = this.league._id;

    this.leagueService.modify(leagueData)
      .subscribe(
      ( league ) => this.router.navigate(['app/league/'+league._id]),
      ( error ) => this.serverError = error
    );
  }

  ngOnDestroy() {
    this.league$.unsubscribe();
  }
}
