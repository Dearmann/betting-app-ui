import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  public users!: User[];

  constructor(private readonly userService: UserService,
    private readonly dialog: MatDialog,
    private readonly snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getAllRealmUsers();
  }

  getAllRealmUsers() {
    this.userService.getAllRealmUsers().subscribe({
      next: response => this.users = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve users')
    });
  }

  deleteButtonClicked(userId: string) {
    let deleteDialog = this.dialog.open(DialogConfirmDeleteComponent, {
      data: { name: 'user' }
    });
    deleteDialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(userId: string) {
    this.userService.privilegedDeleteUser(userId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to delete user'),
      complete: () => {
        this.getAllRealmUsers();
        this.snackbarService.showSuccess('User deleted successfully');
      }
    })
  }

}
