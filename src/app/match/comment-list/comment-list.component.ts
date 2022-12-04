import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from '../../admin-panel/dialog-confirm-delete/dialog-confirm-delete.component';
import { Comment } from "../../model/comment";
import { CommentService } from '../../services/comment.service';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() matchId: number = 0;
  @Input() comments!: Comment[];
  userId: string;
  editingCommentId: number = 0;

  messageControl: FormControl = new FormControl('');

  constructor(
    private readonly commentService: CommentService,
    private readonly dialog: MatDialog,
    private readonly snackbarService: SnackbarService,
    private readonly userService: UserService
    ) {
      this.userId = this.userService.userProfile?.id!;
    }

  ngOnInit(): void {
  }

  getAllCommentsByMatchId(matchId: number) {
    this.commentService.getAllCommentsByMatchId(matchId).subscribe({
      next: response => this.comments = response,
      error: response => this.snackbarService.showError(response, 'Failed to retrieve comments')
    })
  }

  editButtonClicked(comment: Comment) {
    this.messageControl.setValue(comment.message);
    this.editingCommentId = comment.id;
  }

  cancelEditingComment() {
    this.editingCommentId = 0;
  }

  editComment() {
    const commentRequestDto = this.commentService.createRequestDto(this.userId, this.matchId, this.messageControl.value);
    this.commentService.editComment(commentRequestDto, this.editingCommentId).subscribe({
      error: response => this.snackbarService.showError(response, 'Failed to edit comment'),
      complete: () => {
        this.editingCommentId = 0;
        this.getAllCommentsByMatchId(this.matchId);
        this.userService.loadUserData();
      }
    });
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
        this.userService.loadUserData();
      }
    })
  }

}
