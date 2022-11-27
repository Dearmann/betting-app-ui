import { Component, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public actions: string[] = ['Game', 'Event', 'Team', 'Match'];
  public selectedAction: string = "";

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  selectAction(selectionList: MatSelectionList) {
    if (selectionList.selectedOptions.hasValue()) {
      this.selectedAction = selectionList.selectedOptions.selected[0].value;
    }
  }

  createButtonClicked(action: string) {
    this.router.navigateByUrl('/' + action)
  }

}
