import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bet } from '../model/bet';
import { Match } from '../model/match';
import { Rating } from '../model/rating';
import { CommentService } from '../services/comment.service';
import { MatchService } from '../services/match.service';
import { RatingService } from '../services/rating.service';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchId: number;
  match!: Match;
  userId: string;

  averageRating: number = 0;
  betPercentageTeam1: number = 0;
  betPercentageTeam2: number = 0;

  messageControl: FormControl = new FormControl('');

  constructor(
    private readonly matchService: MatchService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly userService: UserService,
    private readonly ratingService: RatingService,
    private readonly commentService: CommentService
    ) {
      this.userId = this.userService.userProfile?.id!;
      this.matchId = parseInt(this.route.snapshot.paramMap.get('matchId') || "");
      if (!this.matchId) {
        router.navigateByUrl("");
      }
    }

  ngOnInit(): void {
    this.getMatchWithInteractionsById(this.matchId);
  }

  getMatchWithInteractionsById(matchId: number) {
    this.matchService.getMatchWithInteractionsById(matchId).subscribe({
      next: response => this.match = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve match'),
      complete: () => {
        this.calculateAverageRating(this.match.ratings);
        this.calculateBetPercentage(this.match.bets);
      }
    });
  }

  calculateAverageRating(ratings: Rating[]) {
    if (ratings.length) {
      ratings.forEach(rating => this.averageRating += rating.rating);
      this.averageRating /= ratings.length;
    }
  }

  calculateBetPercentage(bets: Bet[]) {
    if (this.match.bets.length) {
      let betsForTeam1: Bet[] = bets.filter(bet => bet.predictedTeamId === this.match.team1.id);
      this.betPercentageTeam1 = betsForTeam1.length / this.match.bets.length;
      this.betPercentageTeam2 = 1 - this.betPercentageTeam1;
    }
  }

  matchRated(event: any) {
    console.log(event.rating);
  }

  createComment() {
    const commentRequestDto = this.commentService.createRequestDto(this.userId, this.matchId, this.messageControl.value);
    this.commentService.createComment(commentRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create comment'),
      complete: () => this.snackbarService.showSuccess('Comment created successfully')
    });
  }

}
