import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Game } from '../model/game';
import { EventService } from '../services/event.service';
import { Event } from '../model/event';

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
    private readonly gameService: GameService
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

}
