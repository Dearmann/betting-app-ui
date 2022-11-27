import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/app/model/game';
import { GameService } from 'src/app/services/game.service';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-admin-game-list',
  templateUrl: './admin-game-list.component.html',
  styleUrls: ['./admin-game-list.component.css']
})
export class AdminGameListComponent implements OnInit {

  public error: any;
  public games!: Game[];
  @Output() gameIdEmitter = new EventEmitter<number>();

  constructor(private readonly gameService: GameService, public readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: response => { this.games = response },
      error: error => { this.error = error }
    });
  }

  editButtonClicked(gameId: number) {
    this.gameIdEmitter.emit(gameId);
  }

  deleteButtonClicked(gameId: number) {
    let deleteDialog = this.dialog.open(DialogConfirmDeleteComponent, {
      data: { name: 'game' }
    });
    deleteDialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.deleteGame(gameId);
      }
    });
  }

  deleteGame(gameId: number) {
    this.gameService.deleteGame(gameId).subscribe({
      error: error => this.error = error,
      complete: () => this.getAllGames()
    })
  }

}
