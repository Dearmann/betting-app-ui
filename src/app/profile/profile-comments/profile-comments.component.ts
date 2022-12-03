import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment';
import { Match } from 'src/app/model/match';

@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.css']
})
export class ProfileCommentsComponent implements OnInit, OnChanges {

  @Input() comments: Comment[] = [];
  @Input() matches: Match[] = [];
  matchMap: Map<number, Match> = new Map<number, Match>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.comments && this.matches && this.comments.length && this.matches.length) {
      this.comments.forEach(comment => this.matchMap.set(comment.id, this.matches.find(match => match.id === comment.matchId)!));
    }
  }

}
