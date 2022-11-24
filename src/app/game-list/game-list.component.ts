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

  getGameLogoUrl(gameResponse: GameResponse): string {
    if (gameResponse.logoUrl) {
      return gameResponse.logoUrl;
    }
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/2048px-Video-Game-Controller-Icon-IDV-green.svg.png";
  }
}
