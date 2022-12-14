import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';
import { TeamRequest } from '../model/team-request';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly backendUrl = "/api/teams";

  constructor(private httpClient: HttpClient) { }

  getAllTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(this.backendUrl);
  }

  getTeamById(teamId: number): Observable<Team> {
    return this.httpClient.get<Team>(this.backendUrl + "/" + teamId);
  }

  getTeamsByGameId(gameId: number): Observable<Team[]> {
    return this.httpClient.get<Team[]>(this.backendUrl + "/by-game/" + gameId);
  }

  createTeam(teamRequest: TeamRequest): Observable<Team> {
    return this.httpClient.post<Team>(this.backendUrl, teamRequest);
  }

  editTeam(teamRequest: TeamRequest, teamId: number): Observable<Team> {
    return this.httpClient.put<Team>(this.backendUrl + "/" + teamId, teamRequest);
  }

  deleteTeam(teamId: number): Observable<void> {
    return this.httpClient.delete<void>(this.backendUrl + "/" + teamId);
  }

  getAllTeamLogos(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.backendUrl + "/logo");
  }

  createRequestDto(name: string, logoUrl: string, gameId: number): TeamRequest {
    return {
      "name": name,
      "logoUrl": logoUrl,
      "gameId": gameId
    }
  }
  
}
