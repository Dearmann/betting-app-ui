import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public actions: string[] = ['Game', 'Event', 'Team', 'Match'];
  public selectedAction: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  selectAction(selectionList: MatSelectionList) {
    if (selectionList.selectedOptions.hasValue()) {
      this.selectedAction = selectionList.selectedOptions.selected[0].value;
    }
  }

}
