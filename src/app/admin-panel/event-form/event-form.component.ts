import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Game } from 'src/app/model/game';
import { EventService } from 'src/app/services/event.service';
import { GameService } from 'src/app/services/game.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  @Input() public eventId: number = 0;
  
  eventForm: FormGroup;
  nameControl: FormControl = new FormControl('');
  regionControl: FormControl = new FormControl('');
  seasonControl: FormControl = new FormControl('');
  startControl: FormControl = new FormControl('');
  endControl: FormControl = new FormControl('');
  gameIdControl: FormControl = new FormControl('');

  games: Game[] = [];

  constructor(private readonly eventService: EventService,
    private readonly snackbarService: SnackbarService,
    private readonly gameService: GameService) {
    this.eventForm = new FormGroup({
      name: this.nameControl,
      region: this.regionControl,
      season: this.seasonControl,
      start: this.startControl,
      end: this.endControl,
      gameId: this.gameIdControl
    });
  }

  ngOnInit(): void {
    this.getAllGames();
  }

  ngOnChanges(): void {
    if (this.eventId) {
      this.getEventById(this.eventId);
    }
    else {
      this.nameControl.setValue('');
      this.regionControl.setValue('');
      this.seasonControl.setValue('');
      this.startControl.setValue('');
      this.endControl.setValue('');
      this.gameIdControl.setValue('');
    }
  }

  getEventById(eventId: number) {
    this.eventService.getEventById(eventId).subscribe({
      next: response => {
        this.nameControl.setValue(response.name);
        this.regionControl.setValue(response.region);
        this.seasonControl.setValue(response.season);
        this.startControl.setValue(response.start);
        this.endControl.setValue(response.end);
        this.gameIdControl.setValue(response.gameId);
      },
      error: response => this.snackbarService.showError(response, 'Failed to retrieve event')
    });
  }

  create() {
    const eventRequestDto = this.eventService.createRequestDto(
      this.nameControl.value,
      this.regionControl.value,
      this.seasonControl.value,
      this.startControl.value,
      this.endControl.value,
      this.gameIdControl.value
    );
    this.eventService.createEvent(eventRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create event'),
      complete: () => this.snackbarService.showSuccess('Event created successfully')
    });
  }

  edit() {
    const eventRequestDto = this.eventService.createRequestDto(
      this.nameControl.value,
      this.regionControl.value,
      this.seasonControl.value,
      this.startControl.value,
      this.endControl.value,
      this.gameIdControl.value
    );
    this.eventService.editEvent(eventRequestDto, this.eventId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit event'),
      complete: () => this.snackbarService.showSuccess('Event edited successfully')
    });
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: response => this.games = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve games')
    });
  }

}
