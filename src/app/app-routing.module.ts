import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EventFormComponent } from './admin-panel/event-form/event-form.component';
import { GameFormComponent } from './admin-panel/game-form/game-form.component';
import { MatchFormComponent } from './admin-panel/match-form/match-form.component';
import { TeamFormComponent } from './admin-panel/team-form/team-form.component';
import { AuthGuard } from './auth/auth.guard';
import { EventListComponent } from './event-list/event-list.component';
import { GameListComponent } from './game-list/game-list.component';
import { MatchListComponent } from './match-list/match-list.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  {
    path: 'games',
    component: GameListComponent,
    title: 'Betting - Games'
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    title: 'Betting - Admin Panel',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'matches',
    component: MatchListComponent,
    title: 'Betting - Matches'
  },
  {
    path: 'ranking',
    component: RankingComponent,
    title: 'Betting - Ranking'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Betting - Profile',
    canActivate: [AuthGuard]
  },
  {
    path: 'events/:gameId',
    component: EventListComponent,
    title: 'Betting - Events'
  },
  {
    path: 'game',
    component: GameFormComponent,
    title: 'Betting - Create Game',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'game/:gameId',
    component: GameFormComponent,
    title: 'Betting - Edit Game',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'event',
    component: EventFormComponent,
    title: 'Betting - Create Event',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'event/:eventId',
    component: EventFormComponent,
    title: 'Betting - Edit Event',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'team',
    component: TeamFormComponent,
    title: 'Betting - Create Team',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'team/:teamId',
    component: TeamFormComponent,
    title: 'Betting - Edit Team',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'match',
    component: MatchFormComponent,
    title: 'Betting - Create Match',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'match/:matchId',
    component: MatchFormComponent,
    title: 'Betting - Edit Match',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: '**',
    redirectTo: 'games'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }