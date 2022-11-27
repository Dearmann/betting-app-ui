import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit, OnChanges {

  @Input() public gameId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.gameId) {
      console.log('EDIT');
      // TODO: Editing - game ID specified
    }
    else {
      console.log('CREATE');
      // TODO: Creating - no game ID
    }
  }

}
