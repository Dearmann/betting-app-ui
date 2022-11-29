import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../model/event';
import { Game } from '../model/game';
import { EventService } from '../services/event.service';
import { GameService } from '../services/game.service';
import { MatchService } from '../services/match.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  public events: Event[] = [];
  public game!: Game;
  public gameId: number;

  constructor(
    private readonly eventService: EventService,
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly matchService: MatchService,
    private readonly snackbarService: SnackbarService
  ) {
    this.gameId = parseInt(this.route.snapshot.paramMap.get('gameId') || "");
  }

  ngOnInit(): void {
    if (this.gameId) {
      this.getEventsByGameId(this.gameId);
      this.getGameById(this.gameId);
    }
    else {
      this.getAllEvents();
    }
  }

  getEventsByGameId(gameId: number) {
    this.eventService.getEventsByGameId(gameId).subscribe({
      next: response => this.events = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve events')
    });
  }

  getGameById(gameId: number) {
    this.gameService.getGameById(gameId).subscribe({
      next: response => this.game = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve game')
    });
  }

  getMatchesByEventId(eventId: number, eventToAssignMatches: Event) {
    this.matchService.getMatchesByEventId(eventId).subscribe({
      next: response => eventToAssignMatches.matches = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve matches')
    })
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: response => this.events = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve events')
    })
  }

  eventClicked(eventId: number, index: number) {
    if (!this.events[index].matches) {
      this.getMatchesByEventId(eventId, this.events[index]);
    }
  }

}
