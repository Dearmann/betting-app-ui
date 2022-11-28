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
  nameControl: FormControl = new FormControl('');
  logoUrlControl: FormControl = new FormControl('');

  constructor(private readonly gameService: GameService, private readonly snackbarService: SnackbarService) {
    this.gameForm = new FormGroup({
      name: this.nameControl,
      logoUrl: this.logoUrlControl
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.gameId) {
      this.getGameById(this.gameId);
    }
    else {
      this.nameControl.setValue('');
      this.logoUrlControl.setValue('');
    }
  }

  getGameById(gameId: number) {
    this.gameService.getGameById(gameId).subscribe({
      next: response => {
        this.nameControl.setValue(response.name);
        this.logoUrlControl.setValue(response.logoUrl);
      },
      error: response => this.snackbarService.showError(response, 'Failed to retrieve game')
    });
  }

  create() {
    const gameRequestDto = this.gameService.createRequestDto(this.nameControl.value, this.logoUrlControl.value);
    this.gameService.createGame(gameRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create game'),
      complete: () => this.snackbarService.showSuccess('Game created successfully')
    });
  }

  edit() {
    const gameRequestDto = this.gameService.createRequestDto(this.nameControl.value, this.logoUrlControl.value);
    this.gameService.editGame(gameRequestDto, this.gameId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit game'),
      complete: () => this.snackbarService.showSuccess('Game edited successfully')
    });
  }

}
