import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EventListComponent } from './event-list/event-list.component';
import { GameListComponent } from './game-list/game-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'games',
    component: GameListComponent,
    title: 'Betting - Games'
  },
  {
    path: 'admin',
    component: GameListComponent,
    title: 'Betting - Admin Panel',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'matches',
    component: GameListComponent,
    title: 'Betting - Matches'
  },
  {
    path: 'ranking',
    component: GameListComponent,
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