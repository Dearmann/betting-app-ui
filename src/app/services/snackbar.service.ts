import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private readonly snackBar: MatSnackBar) { }

  showError(errorResponse: any, alternativeMessage: string) {
    this.snackBar.open(
      (errorResponse.error && errorResponse.error.message) ? errorResponse.error.message : alternativeMessage,
      'Close',
      { panelClass: ['snack-bar-error'] }
    )
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { panelClass: ['snack-bar-success'] })
  }
  
}
