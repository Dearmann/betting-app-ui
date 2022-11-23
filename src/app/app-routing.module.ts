import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { GameListComponent } from './game-list/game-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: GameListComponent,
    title: 'Betting - Games'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { roles: ['USER', 'ADMIN'] },
    title: 'Betting - Profile'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }