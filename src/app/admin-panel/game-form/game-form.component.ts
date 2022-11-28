import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameRequest } from 'src/app/model/game-request';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit, OnChanges {

  @Input() public gameId: number = 0;
  gameForm: FormGroup;
  name: FormControl = new FormControl('');
  logoUrl: FormControl = new FormControl('');

  constructor(private readonly gameService: GameService, private readonly snackBar: MatSnackBar) {
    this.gameForm = new FormGroup({
      name: this.name,
      logoUrl: this.logoUrl
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.gameId) {
      this.getGameById(this.gameId);
    }
    else {
      this.name.setValue('');
      this.logoUrl.setValue('');
    }
  }

  getGameById(gameId: number) {
    this.gameService.getGameById(gameId).subscribe({
      next: response => {
        this.name.setValue(response.name);
        this.logoUrl.setValue(response.logoUrl);
      },
      error: response => this.showError(response, 'Failed to retrieve game')
    });
  }

  create() {
    this.gameService.createGame(this.createRequestDto()).subscribe({
      error: response => this.showError(response, 'Failed to create game'),
      complete: () => this.showSuccess('Game created successfully')
    });
  }

  edit() {
    this.gameService.editGame(this.createRequestDto(), this.gameId).subscribe({
      error: (response) => this.showError(response, 'Failed to edit game'),
      complete: () => this.showSuccess('Game edited successfully')
    });
  }

  createRequestDto(): GameRequest {
    return {
      "name": this.name.value,
      "logoUrl": this.logoUrl.value
    }
  }

  showError(errorResponse: any, alternativeMessage: string) {
    this.snackBar.open(
      (errorResponse.error && errorResponse.error.message) ? errorResponse.error.message : alternativeMessage,
      'Close',
      { panelClass: ['snack-bar-error'] }
    )
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { panelClass: ['snack-bar-success'] })
  }

}
