import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly backendUrl = "http://localhost:8080/teams";

  constructor(private httpClient: HttpClient) { }

  getAllTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(this.backendUrl);
  }

  getTeamById(teamId: number): Observable<Team> {
    return this.httpClient.get<Team>(this.backendUrl + "/" + teamId);
  }

  deleteTeam(teamId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + teamId);
  }
  
}
