import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarShipListComponent } from './star-ship-list/star-ship-list.component';
import { StarShipDetailComponent } from './star-ship-detail/star-ship-detail.component';


const routes: Routes = [
  {path: 'starships', component: StarShipListComponent},
  {path: 'starships/:id', component: StarShipDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipRoutingModule { }
