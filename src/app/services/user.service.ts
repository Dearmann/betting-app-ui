import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserRequest } from '../model/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;
  public userProfile: KeycloakProfile | null = null;

  private readonly userUrl = "/api/users";
  private readonly keycloakUrl = "/api/keycloak";

  constructor(
    private httpClient: HttpClient,
    public readonly keycloak: KeycloakService
  ) { }

  async loadUserData(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.isAdmin = this.keycloak.isUserInRole("ADMIN");
    }
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl);
  }

  getUsernameById(userId: string): Observable<string> {
    return this.httpClient.get<string>(this.userUrl + "/username/" + userId);
  }

  getUserWithInteractionsById(userId: string): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + "/" + userId);
  }

  getUserWithInteractionsByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + "/by-username/" + username);
  }

  getAllRealmUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.keycloakUrl);
  }

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(this.keycloakUrl + "/" + userId);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(this.keycloakUrl + "/by-username/" + username);
  }

  createUser(userRequest: UserRequest): Observable<number> {
    return this.httpClient.post<number>(this.keycloakUrl, userRequest);
  }

  editUser(userRequest: UserRequest, userId: string): Observable<void> {
    return this.httpClient.put<void>(this.keycloakUrl + "/" + userId, userRequest);
  }

  sendEmailVerificationLink(userId: string): Observable<void> {
    return this.httpClient.put<void>(this.keycloakUrl + "/verification-link/" + userId, {});
  }

  sendResetPassword(userId: string): Observable<void> {
    return this.httpClient.put<void>(this.keycloakUrl + "/reset-password/" + userId, {});
  }

  deleteUser(userId: string): Observable<void> {
    return this.httpClient.delete<void>(this.keycloakUrl + "/" + userId);
  }

  privilegedDeleteUser(userId: string): Observable<void> {
    return this.httpClient.delete<void>(this.keycloakUrl + "/admin/" + userId);
  }

  createRequestDto(email: string, firstname: string, lastname: string): UserRequest {
    return {
      "email": email,
      "firstName": firstname,
      "lastName": lastname,
    }
  }

}
