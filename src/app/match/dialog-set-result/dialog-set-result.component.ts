import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/model/team';

@Component({
  selector: 'app-dialog-set-result',
  templateUrl: './dialog-set-result.component.html',
  styleUrls: ['./dialog-set-result.component.css']
})
export class DialogSetResultComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {team1: Team, team2: Team}) {}

  ngOnInit(): void {
  }

}
