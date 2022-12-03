import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Bet } from 'src/app/model/bet';
import { Match } from 'src/app/model/match';

@Component({
  selector: 'app-profile-bets',
  templateUrl: './profile-bets.component.html',
  styleUrls: ['./profile-bets.component.css']
})
export class ProfileBetsComponent implements OnInit, OnChanges {

  @Input() bets: Bet[] = [];
  @Input() matches: Match[] = [];
  matchMap: Map<number, Match> = new Map<number, Match>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.bets && this.matches && this.bets.length && this.matches.length) {
      this.bets.forEach(bet => this.matchMap.set(bet.id, this.matches.find(match => match.id === bet.matchId)!));
    }
  }

}
