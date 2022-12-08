import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { EventRequest } from '../model/event-request';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly backendUrl = "/api/events";

  constructor(private readonly httpClient: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.backendUrl);
  }

  getEventById(eventId: number): Observable<Event> {
    return this.httpClient.get<Event>(this.backendUrl + "/" + eventId);
  }

  getEventsByGameId(gameId: number): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.backendUrl + "/by-game/" + gameId);
  }

  createEvent(eventRequest: EventRequest): Observable<Event> {
    return this.httpClient.post<Event>(this.backendUrl, eventRequest);
  }

  editEvent(eventRequest: EventRequest, eventId: number): Observable<Event> {
    return this.httpClient.put<Event>(this.backendUrl + "/" + eventId, eventRequest);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + eventId);
  }

  createRequestDto(name: string, region: string, season: number, start: Date, end: Date, gameId: number): EventRequest {
    return {
      "name": name,
      "region": region,
      "season": season,
      "start": start,
      "end": end,
      "gameId": gameId
    }
  }
  
}