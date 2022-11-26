import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../model/match';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  @Input()
  public matches!: Match[];
  public error: any;

  constructor(private readonly matchService: MatchService) { }

  ngOnInit(): void {
    if (!this.matches) {
      this.getAllMatches();
    }
  }

  getAllMatches() {
    this.matchService.getAllMatches().subscribe({
      next: (response) => { this.matches = response },
      error: (error) => { this.error = error }
    })
  }

}
