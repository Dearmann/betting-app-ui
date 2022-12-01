import { Component, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isLoggedIn: Boolean = false;
  public isAdmin: Boolean = false;

  @ViewChild('games') gamesButton: MatButton = {} as MatButton;
  @ViewChild('matches') matchesButton: MatButton = {} as MatButton;
  @ViewChild('ranking') rankingButton: MatButton = {} as MatButton;
  @ViewChild('admin') adminButton: MatButton = {} as MatButton;
  @ViewChild('profile') profileButton: MatButton = {} as MatButton;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn;
    this.isAdmin = this.userService.isAdmin;
  }

  ngAfterViewInit() {
    this.grayOutButtonBasedOnActiveRoute()
  }

  public login() {
    this.userService.keycloak.login();
  }

  public logout() {
    this.userService.keycloak.logout();
  }

  private grayOutButtonBasedOnActiveRoute() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.gamesButton._elementRef.nativeElement.classList.remove("button-focused");
        this.matchesButton._elementRef.nativeElement.classList.remove("button-focused");
        this.rankingButton._elementRef.nativeElement.classList.remove("button-focused");
        this.adminButton._elementRef.nativeElement.classList.remove("button-focused");
        this.profileButton._elementRef.nativeElement.classList.remove("button-focused");
        switch (event.url) {
          case '/games':
            this.gamesButton._elementRef.nativeElement.classList.add("button-focused");
            break;
          case '/matches':
            this.matchesButton._elementRef.nativeElement.classList.add("button-focused");
            break;
          case '/ranking':
            this.rankingButton._elementRef.nativeElement.classList.add("button-focused");
            break;
          case '/admin':
            this.adminButton._elementRef.nativeElement.classList.add("button-focused");
            break;
          case '/profile':
            this.profileButton._elementRef.nativeElement.classList.add("button-focused");
            break;
        }
      }
    });
  }

}
