import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from '../admin-panel/dialog-confirm-delete/dialog-confirm-delete.component';
import { Comment } from "../model/comment";
import { CommentService } from '../services/comment.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() matchId: number = 0;
  comments!: Comment[];

  constructor(
    private readonly commentService: CommentService,
    private readonly dialog: MatDialog,
    private readonly snackbarService: SnackbarService
    ) { }

  ngOnInit(): void {
    this.getAllCommentsByMatchId(this.matchId);
  }

  getAllCommentsByMatchId(matchId: number) {
    this.commentService.getAllCommentsByMatchId(matchId).subscribe({
      next: response => this.comments = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve comments')
    })
  }

  editButtonClicked(commentId: number) {
    console.log(commentId);
  }

  deleteButtonClicked(commentId: number) {
    let deleteDialog = this.dialog.open(DialogConfirmDeleteComponent, {
      data: { name: 'comment' }
    });
    deleteDialog.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.deleteComment(commentId);
      }
    });
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to delete comment'),
      complete: () => {
        this.getAllCommentsByMatchId(this.matchId);
        this.snackbarService.showSuccess('Comment deleted successfully');
      }
    })
  }

}
