import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bet } from '../model/bet';
import { Match } from '../model/match';
import { Rating } from '../model/rating';
import { Winner } from '../model/winner';
import { BetService } from '../services/bet.service';
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
  userBet: Bet | undefined;
  userRating: Rating | undefined;

  constructor(
    private readonly matchService: MatchService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly userService: UserService,
    private readonly ratingService: RatingService,
    private readonly commentService: CommentService,
    private readonly betService: BetService
  ) {
    this.userId = this.userService.userProfile?.id!;
    this.matchId = parseInt(this.route.snapshot.paramMap.get('matchId') || "");
    if (!this.matchId) {
      router.navigateByUrl("/games");
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
        this.findUserBetAndRating();
      }
    });
  }

  calculateAverageRating(ratings: Rating[]) {
    this.averageRating = 0;
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

  findUserBetAndRating() {
    if (!this.userService?.userProfile?.id!) {
      return;
    }
    this.userService.getUserInteractionsById(this.userService?.userProfile?.id!).subscribe({
      next: response => {
        this.userService.bets = response.bets;
        this.userService.comments = response.comments;
        this.userService.ratings = response.ratings;
      },
      error: response => this.snackbarService.showError(response, 'Failed to retrieve user interactions'),
      complete: () => {
        this.userBet = this.userService.bets.find(bet => bet.matchId === this.matchId);
        this.userRating = this.userService.ratings.find(rating => rating.matchId === this.matchId);
      }
    })
  }

  matchRated(event: any) {
    if (!this.userService.isLoggedIn) {
      this.userService.keycloak.login();
      return;
    }
    // If user rating is present - PUT
    if (this.userRating !== undefined) {

    }
    // No user rating - POST
    else {
      const ratingRequestDto = this.ratingService.createRequestDto(this.userId, this.matchId, event.rating);
      this.ratingService.createRating(ratingRequestDto).subscribe({
        error: response => this.snackbarService.showError(response, 'Failed to create rating'),
        complete: () => this.getAllRatingsByMatchId(this.matchId)
      });
    }
  }

  placeBet(predictedTeamId: number) {
    if (!this.userService.isLoggedIn) {
      this.userService.keycloak.login();
      return;
    }
    // If match finished - can't place a bet
    if (this.match.winner !== Winner.TBD) {
      return
    }
    // If user bet is present - PUT
    if (this.userBet !== undefined) {

    }
    // No user bet - POST
    else {
      const betRequestDto = this.betService.createRequestDto(this.userId, this.matchId, predictedTeamId);
      this.betService.createBet(betRequestDto).subscribe({
        error: response => this.snackbarService.showError(response, 'Failed to create bet'),
        complete: () => this.getAllBetsByMatchId(this.matchId)
      });
    }
  }

  createComment() {
    if (!this.userService.isLoggedIn) {
      this.userService.keycloak.login();
      return;
    }
    const commentRequestDto = this.commentService.createRequestDto(this.userId, this.matchId, this.messageControl.value);
    this.commentService.createComment(commentRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create comment'),
      complete: () => {
        this.getAllCommentsByMatchId(this.matchId);
        this.messageControl.setValue('');
      }
    });
  }

  getAllRatingsByMatchId(matchId: number) {
    this.ratingService.getAllRatingsByMatchId(matchId).subscribe({
      next: response => this.match.ratings = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve ratings'),
      complete: () => {
        this.calculateAverageRating(this.match.ratings);
        this.findUserBetAndRating();
      }
    })
  }

  getAllBetsByMatchId(matchId: number) {
    this.betService.getAllBetsByMatchId(matchId).subscribe({
      next: response => this.match.bets = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve bets'),
      complete: () => {
        this.calculateBetPercentage(this.match.bets);
        this.findUserBetAndRating();
      }
    })
  }

  getAllCommentsByMatchId(matchId: number) {
    this.commentService.getAllCommentsByMatchId(matchId).subscribe({
      next: response => this.match.comments = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve comments')
    })
  }

}
