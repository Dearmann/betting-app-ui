import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/model/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-admin-game-list',
  templateUrl: './admin-game-list.component.html',
  styleUrls: ['./admin-game-list.component.css']
})
export class AdminGameListComponent implements OnInit {

  public error: any;
  public games!: Game[];

  constructor(private readonly gameService: GameService) { }

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: response => { this.games = response },
      error: error => { this.error = error }
    });
  }

}
