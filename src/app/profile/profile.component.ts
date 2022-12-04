import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../model/match';
import { User } from '../model/user';
import { MatchService } from '../services/match.service';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  user: User | null | undefined;
  matches: Match[] | null | undefined;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly snackbarService: SnackbarService,
    private readonly matchService: MatchService,
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getUserWithInteractionsById(this.userId);
      this.getAllMatches();
    }
    else if (this.userService.isLoggedIn) {
      this.getUserWithInteractionsById(this.userService.userProfile?.id!);
      this.getAllMatches();
    }
  }

  getUserWithInteractionsById(userId: string) {
    this.userService.getUserWithInteractionsById(userId).subscribe({
      next: response => this.user = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve user with interactions')
    })
  }

  getAllMatches() {
    this.matchService.getAllMatches().subscribe({
      next: response => this.matches = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve matches')
    })
  }

}
