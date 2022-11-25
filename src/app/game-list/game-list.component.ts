import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Game } from '../model/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

  public games: Game[] = [];
  public error: any;

  constructor(private gameService: GameService, private router: Router) { }

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

  getGameLogoUrl(gameResponse: Game): string {
    if (gameResponse.logoUrl) {
      return gameResponse.logoUrl;
    }
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/2048px-Video-Game-Controller-Icon-IDV-green.svg.png";
  }

  gameClicked(gameId: number) {
    this.router.navigateByUrl("/events/" + gameId);
  }
}
