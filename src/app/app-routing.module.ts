import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { GameListComponent } from './game-list/game-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "", component: GameListComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }