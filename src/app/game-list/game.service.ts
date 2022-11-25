import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameResponse } from './GameResponse';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly backendUrl = "http://localhost:8080/games";

  constructor(private httpClient: HttpClient) { }

  getAllGames(): Observable<GameResponse[]> {
    return this.httpClient.get<GameResponse[]>(this.backendUrl);
  }

  getGameById(gameId: number): Observable<GameResponse> {
    return this.httpClient.get<GameResponse>(this.backendUrl + "/" + gameId);
  }

}
