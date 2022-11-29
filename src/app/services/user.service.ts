import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserRequest } from '../model/user-requesty';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userUrl = "http://localhost:8080/users";
  private readonly keycloakUrl = "http://localhost:8080/keycloak";

  constructor(private httpClient: HttpClient) { }

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
