import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../services/match.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchId: number;

  constructor(
    private readonly matchService: MatchService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService
    ) {
      this.matchId = parseInt(this.route.snapshot.paramMap.get('matchId') || "");
      if (!this.matchId) {
        router.navigateByUrl("");
      }
    }

  ngOnInit(): void {
  }

}
