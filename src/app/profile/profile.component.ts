import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userProfile = this.userService.userProfile;
  }

}
