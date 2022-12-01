import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment';
import { CommentRequest } from '../model/comment-request';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly backendUrl = "http://localhost:8080/comments";

  constructor(private httpClient: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.backendUrl);
  }

  getCommentById(commentId: number): Observable<Comment> {
    return this.httpClient.get<Comment>(this.backendUrl + "/" + commentId);
  }

  getAllCommentsByUserId(userId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.backendUrl + "/by-userid/" + userId);
  }

  getAllCommentsByMatchId(matchId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.backendUrl + "/by-matchid/" + matchId);
  }

  createComment(commentRequest: CommentRequest): Observable<Comment> {
    return this.httpClient.post<Comment>(this.backendUrl, commentRequest);
  }

  editComment(commentRequest: CommentRequest, commentId: number): Observable<Comment> {
    return this.httpClient.put<Comment>(this.backendUrl + "/" + commentId, commentRequest);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + commentId);
  }

  createRequestDto(userId: string, matchId: number, message: string): CommentRequest {
    return {
      "userId": userId, 
      "matchId": matchId, 
      "message": message, 
    }
  }

}
