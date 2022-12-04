import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Event } from 'src/app/model/event';
import { Game } from 'src/app/model/game';
import { Team } from 'src/app/model/team';
import { Winner } from 'src/app/model/winner';
import { EventService } from 'src/app/services/event.service';
import { GameService } from 'src/app/services/game.service';
import { MatchService } from 'src/app/services/match.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  @Input() public matchId: number = 0;

  matchForm: FormGroup;
  winnerControl: FormControl = new FormControl('');
  startControl: FormControl = new FormControl('');
  endControl: FormControl = new FormControl('');
  eventIdControl: FormControl = new FormControl({value: '', disabled: true});
  team1IdControl: FormControl = new FormControl({value: '', disabled: true});
  team2IdControl: FormControl = new FormControl({value: '', disabled: true});

  gameIdControl: FormControl = new FormControl('');

  allGames: Game[] = [];
  allEvents: Event[] = [];
  allTeams: Team[] = [];
  filteredEvents: Event[] = [];
  filteredTeams: Team[] = [];
  teamsOne: Team[] = [];
  teamsTwo: Team[] = [];
  winnerEnum: Winner[] = [Winner.TBD, Winner.TEAM_1, Winner.TEAM_2];

  constructor(private readonly matchService: MatchService,
    private readonly snackbarService: SnackbarService,
    private readonly gameService: GameService,
    private readonly eventService: EventService,
    private readonly teamService: TeamService) {
    this.matchForm = new FormGroup({
      winner: this.winnerControl,
      start: this.startControl,
      end: this.endControl,
      gameId: this.gameIdControl,
      eventId: this.eventIdControl,
      team1Id: this.team1IdControl,
      team2Id: this.team2IdControl
    });
  }

  ngOnInit(): void {
    this.getAllGames();
    this.getAllEvents();
    this.getAllTeams();
  }

  ngOnChanges(): void {
    if (this.matchId) {
      this.getMatchById(this.matchId);
    }
    else {
      this.winnerControl.setValue(Winner.TBD);
      this.startControl.setValue('');
      this.endControl.setValue('');
      this.eventIdControl.setValue('');
      this.team1IdControl.setValue('');
      this.team2IdControl.setValue('');
    }
  }

  getMatchById(matchId: number) {
    this.matchService.getMatchById(matchId).subscribe({
      next: response => {
        this.winnerControl.setValue(response.winner);
        this.startControl.setValue(response.start);
        this.endControl.setValue(response.end);
        this.eventIdControl.setValue(response.eventId);
        this.team1IdControl.setValue(response.team1.id);
        this.team2IdControl.setValue(response.team2.id);
      },
      error: response => this.snackbarService.showError(response, 'Failed to retrieve match')
    });
  }

  create() {
    const matchRequestDto = this.matchService.createRequestDto(
      this.winnerControl.value,
      this.startControl.value,
      this.endControl.value,
      this.eventIdControl.value,
      this.team1IdControl.value,
      this.team2IdControl.value
    );
    this.matchService.createMatch(matchRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create match'),
      complete: () => this.snackbarService.showSuccess('Match created successfully')
    });
  }

  edit() {
    const matchRequestDto = this.matchService.createRequestDto(
      this.winnerControl.value,
      this.startControl.value,
      this.endControl.value,
      this.eventIdControl.value,
      this.team1IdControl.value,
      this.team2IdControl.value
    );
    this.matchService.editMatch(matchRequestDto, this.matchId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit match'),
      complete: () => this.snackbarService.showSuccess('Match edited successfully')
    });
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: response => { this.allGames = response },
      error: response => this.snackbarService.showError(response, 'Failed to retrieve games')
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: response => this.allEvents = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve events')
    });
  }

  getAllTeams() {
    this.teamService.getAllTeams().subscribe({
      next: response => this.allTeams = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve teams')
    });
  }

  startSelected() {
    // Set end date 1h after the start date
    let endDate = new Date(this.startControl.value);
    endDate.setUTCHours(endDate.getHours() + 1);
    this.endControl.setValue(endDate.toISOString().substring(0, 16));
  }

  gameSelected() {
    this.eventIdControl.enable();
    this.team1IdControl.enable();
    this.team2IdControl.enable();
    this.eventIdControl.setValue('');
    this.team1IdControl.setValue('');
    this.team2IdControl.setValue('');
    this.filteredEvents = this.allEvents.filter(event => event.gameId === this.gameIdControl.value);
    this.filteredTeams = this.allTeams.filter(team => team.gameId === this.gameIdControl.value);
    this.teamsOne = this.filteredTeams;
    this.teamsTwo = this.filteredTeams;

  }

  teamSelected() {
    this.teamsTwo = this.filteredTeams.filter(team => team.id !== this.team1IdControl.value);
    this.teamsOne = this.filteredTeams.filter(team => team.id !== this.team2IdControl.value);
  }

}
