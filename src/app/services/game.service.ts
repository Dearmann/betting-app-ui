import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game';
import { GameRequest } from '../model/game-request';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly backendUrl = "/api/games";

  constructor(private httpClient: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.backendUrl);
  }

  getGameById(gameId: number): Observable<Game> {
    return this.httpClient.get<Game>(this.backendUrl + "/" + gameId);
  }

  createGame(gameRequest: GameRequest): Observable<Game> {
    return this.httpClient.post<Game>(this.backendUrl, gameRequest);
  }

  editGame(gameRequest: GameRequest, gameId: number): Observable<Game> {
    return this.httpClient.put<Game>(this.backendUrl + "/" + gameId, gameRequest);
  }

  deleteGame(gameId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + gameId);
  }

  getAllGameLogos(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.backendUrl + "/logo");
  }

  createRequestDto(name: string, logoUrl: string): GameRequest {
    return {
      "name": name,
      "logoUrl": logoUrl
    }
  }

}
