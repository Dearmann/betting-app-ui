import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isLoggedIn: Boolean = false;
  public isAdmin: Boolean = false;

  constructor(private readonly keycloak: KeycloakService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.isAdmin = this.keycloak.isUserInRole("ADMIN");
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
  
}
