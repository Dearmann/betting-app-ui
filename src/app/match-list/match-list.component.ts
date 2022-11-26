import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../model/match';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  @Input()
  public matches: Match[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
