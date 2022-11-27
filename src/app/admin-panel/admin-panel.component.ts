import { Component, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public actions: string[] = ['Game', 'Event', 'Team', 'Match'];
  public selectedAction: string = "";
  public editingEntityId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  selectAction(selectionList: MatSelectionList) {
    if (selectionList.selectedOptions.hasValue()) {
      this.selectedAction = selectionList.selectedOptions.selected[0].value;
    }
  }

  createButtonClicked(action: string) {
    this.editingEntityId = 0;
    this.selectedAction = action + 'Form';
  }

  editButtonClicked(entityId: number) {
    this.editingEntityId = entityId;
    this.selectedAction = this.selectedAction + 'Form';
  }

}
