import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  @Input() public teamId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
