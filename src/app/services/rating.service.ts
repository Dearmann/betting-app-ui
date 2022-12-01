import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../model/rating';
import { RatingRequest } from '../model/rating-request';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private readonly backendUrl = "http://localhost:8080/ratings";

  constructor(private httpClient: HttpClient) { }

  getAllRatings(): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(this.backendUrl);
  }

  getRatingById(ratingId: number): Observable<Rating> {
    return this.httpClient.get<Rating>(this.backendUrl + "/" + ratingId);
  }

  getAllRatingsByUserId(userId: string): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(this.backendUrl + "/by-userid/" + userId);
  }

  getAllRatingsByMatchId(matchId: number): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(this.backendUrl + "/by-matchid/" + matchId);
  }

  createRating(ratingRequest: RatingRequest): Observable<Rating> {
    return this.httpClient.post<Rating>(this.backendUrl, ratingRequest);
  }

  editRating(ratingRequest: RatingRequest, ratingId: number): Observable<Rating> {
    return this.httpClient.put<Rating>(this.backendUrl + "/" + ratingId, ratingRequest);
  }

  deleteRating(ratingId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + ratingId);
  }

  createRequestDto(userId: string, matchId: number, rating: number): RatingRequest {
    return {
      "userId": userId, 
      "matchId": matchId, 
      "rating": rating, 
    }
  }

}
