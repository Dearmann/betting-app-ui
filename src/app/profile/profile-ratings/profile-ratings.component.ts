import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Match } from 'src/app/model/match';
import { Rating } from 'src/app/model/rating';

@Component({
  selector: 'app-profile-ratings',
  templateUrl: './profile-ratings.component.html',
  styleUrls: ['./profile-ratings.component.css']
})
export class ProfileRatingsComponent implements OnInit, OnChanges {

  @Input() ratings: Rating[] | undefined;
  @Input() matches: Match[] | undefined;
  matchMap: Map<number, Match> = new Map<number, Match>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.ratings && this.matches && this.ratings.length && this.matches.length) {
      this.ratings.forEach(rating => this.matchMap.set(rating.id, this.matches?.find(match => match.id === rating.matchId)!));
    }
  }

}
