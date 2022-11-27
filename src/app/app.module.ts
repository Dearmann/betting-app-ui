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
import { MatCardModule } from '@angular/material/card';
import { EventListComponent } from './event-list/event-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RankingComponent } from './ranking/ranking.component';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatchListComponent } from './match-list/match-list.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamListComponent } from './team-list/team-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { AdminGameListComponent } from './admin-panel/admin-game-list/admin-game-list.component';
import { AdminEventListComponent } from './admin-panel/admin-event-list/admin-event-list.component';
import { AdminTeamListComponent } from './admin-panel/admin-team-list/admin-team-list.component';
import { AdminMatchListComponent } from './admin-panel/admin-match-list/admin-match-list.component';
import { GameFormComponent } from './admin-panel/game-form/game-form.component';
import { EventFormComponent } from './admin-panel/event-form/event-form.component';
import { TeamFormComponent } from './admin-panel/team-form/team-form.component';
import { MatchFormComponent } from './admin-panel/match-form/match-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameListComponent,
    ProfileComponent,
    EventListComponent,
    AdminPanelComponent,
    RankingComponent,
    MatchListComponent,
    TeamListComponent,
    AdminGameListComponent,
    AdminEventListComponent,
    AdminTeamListComponent,
    AdminMatchListComponent,
    GameFormComponent,
    EventFormComponent,
    TeamFormComponent,
    MatchFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    KeycloakAngularModule,
    MatCardModule,
    MatExpansionModule,
    MatRippleModule,
    MatProgressBarModule,
    MatListModule,
    MatSidenavModule,
    MatTooltipModule,
    MatMenuModule
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
