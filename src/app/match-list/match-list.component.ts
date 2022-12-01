import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../model/event';
import { Game } from '../model/game';
import { Match } from '../model/match';
import { EventService } from '../services/event.service';
import { GameService } from '../services/game.service';
import { MatchService } from '../services/match.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  @Input() public matches!: Match[];
  games!: Game[];
  events!: Event[];
  mapEventToGame: Map<number, Game> = new Map<number, Game>();

  constructor(
    private readonly matchService: MatchService,
    private readonly snackbarService: SnackbarService,
    private readonly gameService: GameService,
    private readonly eventService: EventService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.matches) {
      this.getAllMatches();
      this.getAllEvents();
    }
  }

  getAllMatches() {
    this.matchService.getAllMatches().subscribe({
      next: response => this.matches = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve matches')
    })
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: response => this.events = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve events'),
      complete: () => this.getAllGames()
    })
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: response => {
        this.games = response;
        this.fillEventToGameMap();
      },
      error: response => this.snackbarService.showError(response, 'Failed to retrieve games')
    });
  }

  fillEventToGameMap() {
    this.events.forEach(event => this.mapEventToGame.set(event.id, this.games.find(game => game.id === event.gameId)!));
  }

  matchClicked(match: Match) {
    this.router.navigateByUrl("/match/" + match.id);
  }

}
