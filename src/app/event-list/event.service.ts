import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventResponse } from './EventResponse';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly backendUrl = "http://localhost:8080/events";

  constructor(private readonly httpClient: HttpClient) { }

  getEventsByGameId(gameId: number): Observable<EventResponse[]> {
    return this.httpClient.get<EventResponse[]>(this.backendUrl + "/by-game/" + gameId);
  }
}
