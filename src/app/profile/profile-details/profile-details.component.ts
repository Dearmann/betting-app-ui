import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from 'src/app/admin-panel/dialog-confirm-delete/dialog-confirm-delete.component';
import { User } from 'src/app/model/user';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { DialogPasswordResetComponent } from '../dialog-password-reset/dialog-password-reset.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  @Input() user: User | null | undefined;
  loggedInUserId: string = '';
  editingProfile: boolean = false;

  userForm: FormGroup;

  constructor(
    private readonly userService: UserService,
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }

  ngOnInit(): void {
    setTimeout(() => this.loggedInUserId = this.userService.user?.id!, 10);
  }

  getUserWithInteractionsById(userId: string) {
    this.userService.getUserWithInteractionsById(userId).subscribe({
      next: response => this.user = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve user with interactions')
    })
  }

  editButtonClicked() {
    this.userForm.get('email')?.setValue(this.user?.email);
    this.userForm.get('firstName')?.setValue(this.user?.firstName);
    this.userForm.get('lastName')?.setValue(this.user?.lastName);
    this.editingProfile = true;
  }

  cancelButtonClicked() {
    this.editingProfile = false;
  }

  edit() {
    const userRequestDto = this.userService.createRequestDto(
      this.userForm.get('email')?.value,
      this.userForm.get('firstName')?.value,
      this.userForm.get('lastName')?.value,
    );
    this.userService.editUser(userRequestDto, this.user!.id).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit user'),
      complete: () => {
        this.snackbarService.showSuccess('User edited successfully');
        this.editingProfile = false;
        this.userService.loadUserData();
        this.getUserWithInteractionsById(this.user!.id);
      }
    });
  }

  resetPasswordButtonClicked() {
    let resetPasswordDialog = this.dialog.open(DialogPasswordResetComponent);
    resetPasswordDialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.sendResetPasswordEmail();
      }
    });
  }

  sendResetPasswordEmail() {
    this.userService.sendResetPassword(this.user!.id).subscribe({
      error: response => this.snackbarService.showError(response, 'Error sending password reset email'),
      complete: () => this.snackbarService.showSuccess('Password reset email has been sent successfully')
    })
  }

  deleteButtonClicked() {
    let deleteDialog = this.dialog.open(DialogConfirmDeleteComponent, {
      data: { name: 'account' }
    });
    deleteDialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.deleteUser();
      }
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.user!.id).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to delete user'),
      complete: () => this.userService.keycloak.logout()
    })
  }

}
