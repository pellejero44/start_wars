import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarShipListComponent } from './components/starship/star-ship-list/star-ship-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'starships', pathMatch: 'full'},
  {path: 'starships', component: StarShipListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
