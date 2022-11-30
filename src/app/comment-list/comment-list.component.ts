import { Component, Input, OnInit } from '@angular/core';
import { Comment } from "../model/comment";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() comments!: Comment[];

  constructor() { }

  ngOnInit(): void {
  }

  editComment(commentId: number) {
    console.log(commentId);
  }

  deleteComment(commentId: number) {
    console.log(commentId);
  }

}
