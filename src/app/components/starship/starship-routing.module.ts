import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarShipListComponent } from './star-ship-list/star-ship-list.component';
import { StarShipDetailComponent } from './star-ship-detail/star-ship-detail.component';
import { StarshipComponent } from './starship.component';


const routes: Routes = [
  {
    path: 'starships',
    component: StarshipComponent,
    children: [
      { path: '', component: StarShipListComponent },
      { path: ':id', component: StarShipDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipRoutingModule { }
