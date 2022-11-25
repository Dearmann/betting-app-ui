import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private readonly backendUrl = "http://localhost:8080/matches";

  constructor(private readonly httpClient: HttpClient) { }

  getMatchesByEventId(eventId: number): Observable<Match[]> {
    return this.httpClient.get<Match[]>(this.backendUrl + "/by-event/" + eventId);
  }
}
