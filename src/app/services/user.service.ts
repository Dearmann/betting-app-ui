import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable } from 'rxjs';
import { Bet } from '../model/bet';
import { Comment } from '../model/comment';
import { Rating } from '../model/rating';
import { User } from '../model/user';
import { UserRequest } from '../model/user-requesty';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public bets: Bet[] = [];
  public comments: Comment[] = [];
  public ratings: Rating[] = [];
  public isLoggedIn: Boolean = false;
  public isAdmin: Boolean = false;
  public userProfile: KeycloakProfile | null = null;

  private readonly userUrl = "http://localhost:8080/users";
  private readonly keycloakUrl = "http://localhost:8080/keycloak";

  constructor(
    private httpClient: HttpClient,
    private readonly snackbarService: SnackbarService,
    public readonly keycloak: KeycloakService
  ) { }

  async loadUserData(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.isAdmin = this.keycloak.isUserInRole("ADMIN");
      this.getUserInteractionsById(this.userProfile.id!).subscribe({
        next: response => {
          this.bets = response.bets;
          this.comments = response.comments;
          this.ratings = response.ratings;
        },
        error: response => this.snackbarService.showError(response, 'Failed to retrieve user interactions')
      })
    }
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl);
  }

  getUsernameById(userId: string): Observable<string> {
    return this.httpClient.get<string>(this.userUrl + "/username/" + userId);
  }

  getUserInteractionsById(userId: string): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + "/" + userId);
  }

  getUserInteractionsByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + "/by-username/" + username);
  }

  getAllRealmUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.keycloakUrl);
  }

  getUserById(userId: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.keycloakUrl + "/" + userId);
  }

  getUserByUsername(username: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.keycloakUrl + "/by-username/" + username);
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

  createRequestDto(username: string, password: string, email: string, firstname: string, lastname: string): UserRequest {
    return {
      "username": username,
      "password": password,
      "email": email,
      "firstName": firstname,
      "lastName": lastname,
    }
  }

}
