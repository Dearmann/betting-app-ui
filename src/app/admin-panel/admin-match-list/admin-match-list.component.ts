import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Match } from 'src/app/model/match';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-admin-match-list',
  templateUrl: './admin-match-list.component.html',
  styleUrls: ['./admin-match-list.component.css']
})
export class AdminMatchListComponent implements OnInit {

  public error: any;
  public matches!: Match[];
  @Output() matchIdEmitter = new EventEmitter<number>();

  constructor(private readonly matchService: MatchService) { }

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

  }

}
