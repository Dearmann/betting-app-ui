import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../model/match';
import { MatchService } from '../services/match.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  @Input()
  public matches!: Match[];

  constructor(private readonly matchService: MatchService, private readonly snackbarService: SnackbarService) { }

  ngOnInit(): void {
    if (!this.matches) {
      this.getAllMatches();
    }
  }

  getAllMatches() {
    this.matchService.getAllMatches().subscribe({
      next: response => this.matches = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve matches')
    })
  }

}
