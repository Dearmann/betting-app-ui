import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

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

  constructor(private readonly gameService: GameService, private readonly snackbarService: SnackbarService) {
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
      error: response => this.snackbarService.showError(response, 'Failed to retrieve game')
    });
  }

  create() {
    const gameRequestDto = this.gameService.createRequestDto(this.name.value, this.logoUrl.value);
    this.gameService.createGame(gameRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create game'),
      complete: () => this.snackbarService.showSuccess('Game created successfully')
    });
  }

  edit() {
    const gameRequestDto = this.gameService.createRequestDto(this.name.value, this.logoUrl.value);
    this.gameService.editGame(gameRequestDto, this.gameId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit game'),
      complete: () => this.snackbarService.showSuccess('Game edited successfully')
    });
  }

}
