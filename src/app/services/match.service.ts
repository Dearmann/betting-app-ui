import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/match';
import { MatchRequest } from '../model/match-request';
import { Winner } from '../model/winner';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private readonly backendUrl = "http://localhost:8080/matches";

  constructor(private readonly httpClient: HttpClient) { }

  getAllMatches(): Observable<Match[]> {
    return this.httpClient.get<Match[]>(this.backendUrl);
  }

  getMatchById(matchId: number): Observable<Match> {
    return this.httpClient.get<Match>(this.backendUrl + "/" + matchId);
  }

  getMatchWithInteractionsById(matchId: number): Observable<Match> {
    return this.httpClient.get<Match>(this.backendUrl + "/interactions/" + matchId);
  }

  getMatchesByEventId(eventId: number): Observable<Match[]> {
    return this.httpClient.get<Match[]>(this.backendUrl + "/by-event/" + eventId);
  }

  createMatch(matchRequest: MatchRequest): Observable<Match> {
    return this.httpClient.post<Match>(this.backendUrl, matchRequest);
  }

  editMatch(matchRequest: MatchRequest, matchId: number): Observable<Match> {
    return this.httpClient.put<Match>(this.backendUrl + "/" + matchId, matchRequest);
  }

  setMatchResult(matchId: number, winnerId: number): Observable<Match> {
    return this.httpClient.put<Match>(`${this.backendUrl}/result?matchId=${matchId}&winnerId=${winnerId}`, {});
  }

  deleteMatch(matchId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + matchId);
  }

  createRequestDto(winner: Winner, start: Date, end: Date, eventId: number, team1Id: number, team2Id: number): MatchRequest {
    return {
      "winner": winner,
      "start": start,
      "end": end,
      "eventId": eventId,
      "team1Id": team1Id,
      "team2Id": team2Id
    }
  }
  
}
