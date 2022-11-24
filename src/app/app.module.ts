import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GameListComponent } from './game-list/game-list.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { keycloakInit } from './auth/keycloak-init.factory';
import { ProfileComponent } from './profile/profile.component';
import { ConfigService } from './config/config.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    KeycloakAngularModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakInit,
      multi: true,
      deps: [KeycloakService, ConfigService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
