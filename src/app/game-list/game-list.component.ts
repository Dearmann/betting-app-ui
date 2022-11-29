import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../model/game';
import { GameService } from '../services/game.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {

  public games: Game[] = [];

  constructor(private gameService: GameService,
    private router: Router,
    private readonly snackbarService: SnackbarService) { }

  ngOnInit() {
    this.getAllGames()
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: response => this.games = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve games')
    });
  }

  getGameLogoUrl(gameResponse: Game): string {
    if (gameResponse.logoUrl) {
      return gameResponse.logoUrl;
    }
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/2048px-Video-Game-Controller-Icon-IDV-green.svg.png";
  }

  gameClicked(gameId: number, index: number) {
    if (this.games[index].eventIds.length !== 0) {
      this.router.navigateByUrl("/events/" + gameId);
    }
  }
}
