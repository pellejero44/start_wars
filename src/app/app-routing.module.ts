import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarShipListComponent } from './components/starship/star-ship-list/star-ship-list.component';
import { StarShipDetailComponent } from './components/starship/star-ship-detail/star-ship-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'starships', pathMatch: 'full'},
  {path: 'starships', component: StarShipListComponent},
  {path: 'starships/:id', component: StarShipDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
