import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  @Input() public eventId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
