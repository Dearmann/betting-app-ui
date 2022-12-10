import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Game } from 'src/app/model/game';
import { GameService } from 'src/app/services/game.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  @Input() public teamId: number = 0;
  logoUrls: string[] = [];

  teamForm: FormGroup;
  nameControl: FormControl = new FormControl('');
  logoUrlControl: FormControl = new FormControl('');
  gameIdControl: FormControl = new FormControl('');

  games: Game[] = [];

  constructor(private readonly teamService: TeamService,
    private readonly snackbarService: SnackbarService,
    private readonly gameService: GameService) {
    this.teamForm = new FormGroup({
      name: this.nameControl,
      logoUrl: this.logoUrlControl,
      gameId: this.gameIdControl
    });
  }

  ngOnInit(): void {
    this.getAllGames();
    this.getAllTeamLogos();
  }

  ngOnChanges(): void {
    if (this.teamId) {
      this.getTeamById(this.teamId);
    }
    else {
      this.nameControl.setValue('');
      this.logoUrlControl.setValue('');
      this.gameIdControl.setValue('');
    }
  }

  getTeamById(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe({
      next: response => {
        this.nameControl.setValue(response.name);
        this.logoUrlControl.setValue(response.logoUrl);
        this.gameIdControl.setValue(response.gameId);
      },
      error: response => this.snackbarService.showError(response, 'Failed to retrieve team')
    });
  }

  create() {
    const teamRequestDto = this.teamService.createRequestDto(
      this.nameControl.value,
      this.logoUrlControl.value,
      this.gameIdControl.value
    );
    this.teamService.createTeam(teamRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create team'),
      complete: () => this.snackbarService.showSuccess('Team created successfully')
    });
  }

  edit() {
    const teamRequestDto = this.teamService.createRequestDto(
      this.nameControl.value,
      this.logoUrlControl.value,
      this.gameIdControl.value
    );
    this.teamService.editTeam(teamRequestDto, this.teamId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit team'),
      complete: () => this.snackbarService.showSuccess('Team edited successfully')
    });
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: response => this.games = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve games')
    });
  }

  getAllTeamLogos() {
    this.teamService.getAllTeamLogos().subscribe({
      next: response => this.logoUrls = response,
      error: response => this.snackbarService.showError(response, 'Failed to get team logo URLs')
    });
  }

}
