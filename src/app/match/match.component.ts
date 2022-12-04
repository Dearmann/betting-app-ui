import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { DialogSetResultComponent } from './dialog-set-result/dialog-set-result.component';

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
  isAdmin: boolean = false;

  constructor(
    private readonly matchService: MatchService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
    private readonly userService: UserService,
    private readonly ratingService: RatingService,
    private readonly commentService: CommentService,
    private readonly betService: BetService,
    private readonly dialog: MatDialog
  ) {
    this.userId = this.userService.userProfile?.id!;
    this.isAdmin = this.userService.isAdmin;
    this.matchId = parseInt(this.route.snapshot.paramMap.get('matchId') || "");
    if (!this.matchId) {
      this.router.navigateByUrl("/games");
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
    // Don't load user's bets and ratings if he is not logged in
    if (!this.userService?.isLoggedIn) {
      return;
    }
    this.userService.getUserWithInteractionsById(this.userService?.userProfile?.id!).subscribe({
      next: response => this.userService.user = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve user interactions'),
      complete: () => {
        this.userBet = this.userService.user!.bets.find(bet => bet.matchId === this.matchId);
        this.userRating = this.userService.user!.ratings.find(rating => rating.matchId === this.matchId);
      }
    })
  }

  matchRated(event: any) {
    if (!this.isUserAuthenticated()) {
      return;
    }
    // If user rating is present - PUT
    if (this.userRating !== undefined) {
      this.editRating(event.rating);
    }
    // No user rating - POST
    else {
      this.createRating(event.rating);
    }
  }

  createRating(ratingValue: number) {
    const ratingRequestDto = this.ratingService.createRequestDto(this.userId, this.matchId, ratingValue);
    this.ratingService.createRating(ratingRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create rating'),
      complete: () => this.getAllRatingsByMatchId(this.matchId)
    });
  }

  editRating(ratingValue: number) {
    const ratingRequestDto = this.ratingService.createRequestDto(this.userId, this.matchId, ratingValue);
    this.ratingService.editRating(ratingRequestDto, this.userRating!.id).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit rating'),
      complete: () => this.getAllRatingsByMatchId(this.matchId)
    });
  }

  placeBet(predictedTeamId: number) {
    if (!this.isUserAuthenticated()) {
      return;
    }
    // If match finished - can't place a bet
    if (this.match.winner !== Winner.TBD) {
      return;
    }
    // If match has already started - can't place a bet
    if (Date.now() - new Date(this.match.start).getTime() > 0) {
      return;
    }
    // If user bet is present - PUT
    if (this.userBet !== undefined) {
      this.editBet(predictedTeamId);
    }
    // No user bet - POST
    else {
      this.createBet(predictedTeamId);
    }
  }

  createBet(predictedTeamId: number) {
    const betRequestDto = this.betService.createRequestDto(this.userId, this.matchId, predictedTeamId);
    this.betService.createBet(betRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create bet'),
      complete: () => this.getAllBetsByMatchId(this.matchId)
    });
  }

  editBet(predictedTeamId: number) {
    const betRequestDto = this.betService.createRequestDto(this.userId, this.matchId, predictedTeamId);
    this.betService.editBet(betRequestDto, this.userBet!.id).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit bet'),
      complete: () => this.getAllBetsByMatchId(this.matchId)
    });
  }

  createComment() {
    if (!this.isUserAuthenticated()) {
      return;
    }
    const commentRequestDto = this.commentService.createRequestDto(this.userId, this.matchId, this.messageControl.value);
    this.commentService.createComment(commentRequestDto).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to create comment'),
      complete: () => {
        this.getAllCommentsByMatchId(this.matchId);
        this.messageControl.setValue('');
        this.userService.loadUserData();
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

  isUserAuthenticated(): boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }
    this.userService.keycloak.login();
    return false;
  }

  setResultButtonClicked() {
    let resultDialog = this.dialog.open(DialogSetResultComponent, {
      data: { team1: this.match.team1, team2: this.match.team2 }
    });
    resultDialog.afterClosed().subscribe(winnerTeamId => {
      if (winnerTeamId) {
        this.setMatchResult(winnerTeamId);
      }
    });
  }

  setMatchResult(winnerTeamId: number) {
    this.matchService.setMatchResult(this.matchId, winnerTeamId).subscribe({
      next: response => this.match = response,
      error: response => this.snackbarService.showError(response, 'Error while setting match result')
    });
  }

}
