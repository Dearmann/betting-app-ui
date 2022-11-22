import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { GameResponse } from './GameResponse';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

  public games: GameResponse[] = [];
  public error: any;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getAllGames()
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe(
      response => {
        this.games = response;
      },
      error => {
        this.error = error;
      }
    );
  }

  getGameLogoUrl(): string {
    return this.games[0].logoUrl;
  }
}
