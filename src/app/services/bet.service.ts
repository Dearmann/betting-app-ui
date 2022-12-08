import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bet } from '../model/bet';
import { BetRequest } from '../model/bet-request';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  private readonly backendUrl = "/api/bets";

  constructor(private httpClient: HttpClient) { }

  getAllBets(): Observable<Bet[]> {
    return this.httpClient.get<Bet[]>(this.backendUrl);
  }

  getBetById(betId: number): Observable<Bet> {
    return this.httpClient.get<Bet>(this.backendUrl + "/" + betId);
  }

  getAllBetsByUserId(userId: string): Observable<Bet[]> {
    return this.httpClient.get<Bet[]>(this.backendUrl + "/by-userid/" + userId);
  }

  getAllBetsByMatchId(matchId: number): Observable<Bet[]> {
    return this.httpClient.get<Bet[]>(this.backendUrl + "/by-matchid/" + matchId);
  }

  createBet(betRequest: BetRequest): Observable<Bet> {
    return this.httpClient.post<Bet>(this.backendUrl, betRequest);
  }

  editBet(betRequest: BetRequest, betId: number): Observable<Bet> {
    return this.httpClient.put<Bet>(this.backendUrl + "/" + betId, betRequest);
  }

  deleteBet(betId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + betId);
  }

  createRequestDto(userId: string, matchId: number, predictedTeamId: number): BetRequest {
    return {
      "userId": userId, 
      "matchId": matchId, 
      "predictedTeamId": predictedTeamId, 
    }
  }

}
