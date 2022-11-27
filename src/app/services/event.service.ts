import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly backendUrl = "http://localhost:8080/events";

  constructor(private readonly httpClient: HttpClient) { }

  getEventsByGameId(gameId: number): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.backendUrl + "/by-game/" + gameId);
  }

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.backendUrl);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + eventId);
  }

}
