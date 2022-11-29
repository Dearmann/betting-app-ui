import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team } from 'src/app/model/team';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TeamService } from 'src/app/services/team.service';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
  styleUrls: ['./admin-team-list.component.css']
})
export class AdminTeamListComponent implements OnInit {

  public teams!: Team[];
  @Output() teamIdEmitter = new EventEmitter<number>();

  constructor(private readonly teamService: TeamService,
    private readonly dialog: MatDialog,
    private readonly snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getAllTeams();
  }

  getAllTeams() {
    this.teamService.getAllTeams().subscribe({
      next: response => this.teams = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve teams')
    });
  }

  editButtonClicked(teamId: number) {
    this.teamIdEmitter.emit(teamId);
  }

  deleteButtonClicked(teamId: number) {
    let deleteDialog = this.dialog.open(DialogConfirmDeleteComponent, {
      data: { name: 'team' }
    });
    deleteDialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.deleteTeam(teamId);
      }
    });
  }

  deleteTeam(teamId: number) {
    this.teamService.deleteTeam(teamId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to delete team'),
      complete: () => {
        this.getAllTeams();
        this.snackbarService.showSuccess('Team deleted successfully');
      }
    })
  }

}
