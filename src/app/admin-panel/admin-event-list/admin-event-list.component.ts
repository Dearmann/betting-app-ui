import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.css']
})
export class AdminEventListComponent implements OnInit {

  public error: any;
  public events!: Event[];
  @Output() eventIdEmitter = new EventEmitter<number>();

  constructor(private readonly eventService: EventService) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: response => { this.events = response },
      error: error => { this.error = error }
    });
  }

  editButtonClicked(eventId: number) {
    this.eventIdEmitter.emit(eventId);
  }

  deleteButtonClicked(eventId: number) {

  }

}
