import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
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
    path: '**',
    redirectTo: 'games'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }