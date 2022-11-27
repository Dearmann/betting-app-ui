import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
  styleUrls: ['./admin-team-list.component.css']
})
export class AdminTeamListComponent implements OnInit {

  public error: any;
  public teams!: Team[];
  @Output() teamIdEmitter = new EventEmitter<number>();

  constructor(private readonly teamService: TeamService) { }

  ngOnInit(): void {
    this.getAllTeams();
  }

  getAllTeams() {
    this.teamService.getAllTeams().subscribe({
      next: response => { this.teams = response },
      error: error => { this.error = error }
    });
  }

  editButtonClicked(teamId: number) {
    this.teamIdEmitter.emit(teamId);
  }

  deleteButtonClicked(teamId: number) {

  }

}
