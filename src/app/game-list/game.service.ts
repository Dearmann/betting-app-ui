import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly backendUrl = "http://localhost:8080/games";

  constructor(private httpClient: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.backendUrl);
  }

  getGameById(gameId: number): Observable<Game> {
    return this.httpClient.get<Game>(this.backendUrl + "/" + gameId);
  }

}
