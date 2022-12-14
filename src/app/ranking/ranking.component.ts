import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bet } from '../model/bet';
import { User } from '../model/user';
import { BetService } from '../services/bet.service';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  bets: Bet[] | undefined;
  users: User[] | undefined;
  usersBetInformation: UserBetInformation[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly betService: BetService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getAllBets();
    this.getAllRealmUsers();
  }

  getAllBets() {
    this.betService.getAllBets().subscribe({
      next: response => this.bets = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve bets'),
      complete: () => this.fillUserWithBetsMap()
    })
  }

  getAllRealmUsers() {
    this.userService.getAllRealmUsers().subscribe({
      next: response => this.users = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve users'),
      complete: () => this.fillUserWithBetsMap()
    })
  }

  fillUserWithBetsMap() {
    // If bets and users are already loaded -> fill UserBetInformation
    if (this.bets && this.users) {
      this.users.forEach(user => {
        let userFinishedBets: Bet[] = this.bets!.filter(bet => (bet.matchFinished && bet.userId === user.id));
        let userCorrectBets: Bet[] = userFinishedBets.filter(userBet => userBet.correctPrediction);
        this.usersBetInformation.push({
          user: user,
          betCount: userFinishedBets.length,
          correctPredictions: (userCorrectBets.length / userFinishedBets.length) ? userCorrectBets.length / userFinishedBets.length : 0
        })
      })
      this.usersBetInformation.sort((a, b) => b.correctPredictions - a.correctPredictions);
    }
  }

  userClicked(userId: string) {
    this.router.navigateByUrl('/profile/' + userId);
  }
}

interface UserBetInformation {
  user: User;
  betCount: number;
  correctPredictions: number;
}