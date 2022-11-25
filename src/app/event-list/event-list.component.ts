import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Game } from '../model/game';
import { EventService } from '../services/event.service';
import { Event } from '../model/event';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  public events: Event[] = [];
  public game!: Game;
  public gameId: number;
  public error: any;

  constructor(
    private readonly eventService: EventService,
    private readonly route: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly matchService: MatchService
  ) {
    this.gameId = parseInt(this.route.snapshot.paramMap.get('gameId') || "");
  }

  ngOnInit(): void {
    this.getEventsByGameId(this.gameId);
    this.getGameById(this.gameId);
  }

  getEventsByGameId(gameId: number) {
    this.eventService.getEventsByGameId(gameId).subscribe(
      response => {
        this.events = response;
      },
      error => {
        this.error = error;
      }
    );
  }

  getGameById(gameId: number) {
    this.gameService.getGameById(gameId).subscribe(
      response => {
        this.game = response;
      },
      error => {
        this.error = error;
      }
    );
  }

  getMatchesByEventId(eventId: number, eventToAssignMatches: Event) {
    this.matchService.getMatchesByEventId(eventId).subscribe(
      response => {
        eventToAssignMatches.matches = response;
      },
      error => {
        this.error = error;
      }
    )
  }

  eventClicked(eventId: number, index: number) {
    if (!this.events[index].matches) {
      this.getMatchesByEventId(eventId, this.events[index]);
    }
  }

}
