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
import { initializeAppFactory } from './init/app-init.factory';
import { ProfileComponent } from './profile/profile.component';
import { ConfigService } from './config/config.service';
import { MatCardModule } from '@angular/material/card';
import { EventListComponent } from './game-list/event-list/event-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RankingComponent } from './ranking/ranking.component';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatchListComponent } from './match-list/match-list.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { AdminGameListComponent } from './admin-panel/admin-game-list/admin-game-list.component';
import { AdminEventListComponent } from './admin-panel/admin-event-list/admin-event-list.component';
import { AdminTeamListComponent } from './admin-panel/admin-team-list/admin-team-list.component';
import { AdminMatchListComponent } from './admin-panel/admin-match-list/admin-match-list.component';
import { GameFormComponent } from './admin-panel/game-form/game-form.component';
import { EventFormComponent } from './admin-panel/event-form/event-form.component';
import { TeamFormComponent } from './admin-panel/team-form/team-form.component';
import { MatchFormComponent } from './admin-panel/match-form/match-form.component';
import { DialogConfirmDeleteComponent } from './admin-panel/dialog-confirm-delete/dialog-confirm-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminUserListComponent } from './admin-panel/admin-user-list/admin-user-list.component';
import { MatchComponent } from './match/match.component';
import { StarRatingModule } from 'angular-star-rating';
import { CommentListComponent } from './match/comment-list/comment-list.component';
import { UserService } from './services/user.service';
import { DialogSetResultComponent } from './match/dialog-set-result/dialog-set-result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { DialogPasswordResetComponent } from './profile/dialog-password-reset/dialog-password-reset.component';

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
    AdminGameListComponent,
    AdminEventListComponent,
    AdminTeamListComponent,
    AdminMatchListComponent,
    GameFormComponent,
    EventFormComponent,
    TeamFormComponent,
    MatchFormComponent,
    DialogConfirmDeleteComponent,
    AdminUserListComponent,
    MatchComponent,
    CommentListComponent,
    DialogSetResultComponent,
    ProfileDetailsComponent,
    DialogPasswordResetComponent
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
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    StarRatingModule.forRoot(),
    MatTabsModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [KeycloakService, ConfigService, UserService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
