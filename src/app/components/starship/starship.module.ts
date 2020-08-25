import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StarshipRoutingModule } from './starship-routing.module';
import { LazyLoadImagesModule } from 'src/app/directives/lazyLoadImage/lazy-load-image.module';
import { StarShipListComponent } from './star-ship-list/star-ship-list.component';
import { StarshipCardComponent } from './starship-card/starship-card.component';
import { StarShipDetailComponent } from './star-ship-detail/star-ship-detail.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { StarshipComponent } from './starship.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    StarShipListComponent,
    StarshipCardComponent,
    StarShipDetailComponent,
    StarshipComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StarshipRoutingModule,
    MaterialModule,
    LazyLoadImagesModule,
  ],
  providers: [AuthGuardService]
})
export class StarshipModule { }
