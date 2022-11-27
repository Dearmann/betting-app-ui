import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  public gameId: number;

  constructor(private readonly route: ActivatedRoute) {
    this.gameId = parseInt(this.route.snapshot.paramMap.get('gameId') || "");
  }

  ngOnInit(): void {
    if (this.gameId) {
      // TODO: Editing - game ID specified
    }
    else {
      // TODO: Creating - no game ID
    }
  }

}
