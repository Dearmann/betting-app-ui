import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  @Input() public matchId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
