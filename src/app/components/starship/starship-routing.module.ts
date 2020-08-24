import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarShipListComponent } from './star-ship-list/star-ship-list.component';
import { StarShipDetailComponent } from './star-ship-detail/star-ship-detail.component';
import { AuthGuardService as AuthGuard } from 'src/app/services/auth-guard.service';


const routes: Routes = [
  {path: 'starships', component: StarShipListComponent},
  {path: 'starships/:id', component: StarShipDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipRoutingModule { }
