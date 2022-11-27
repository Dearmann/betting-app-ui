import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Match } from 'src/app/model/match';
import { MatchService } from 'src/app/services/match.service';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-admin-match-list',
  templateUrl: './admin-match-list.component.html',
  styleUrls: ['./admin-match-list.component.css']
})
export class AdminMatchListComponent implements OnInit {

  public error: any;
  public matches!: Match[];
  @Output() matchIdEmitter = new EventEmitter<number>();

  constructor(private readonly matchService: MatchService, public readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllMatches();
  }

  getAllMatches() {
    this.matchService.getAllMatches().subscribe({
      next: response => { this.matches = response },
      error: error => { this.error = error }
    });
  }

  editButtonClicked(matchId: number) {
    this.matchIdEmitter.emit(matchId);
  }

  deleteButtonClicked(matchId: number) {
    let deleteDialog = this.dialog.open(DialogConfirmDeleteComponent, {
      data: { name: 'match' }
    });
    deleteDialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.deleteMatch(matchId);
      }
    });
  }

  deleteMatch(matchId: number) {
    this.matchService.deleteMatch(matchId).subscribe({
      error: error => this.error = error,
      complete: () => this.getAllMatches()
    })
  }

}
