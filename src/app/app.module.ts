import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StarShipListComponent } from './components/starship/star-ship-list/star-ship-list.component';
import { StarshipCardComponent } from './components/starship/starship-card/starship-card.component';
import {MatCardModule} from '@angular/material/card';
import { LazyLoadImagesModule } from 'src/app/directives/lazyLoadImage/lazy-load-image.module';
import { StarShipDetailComponent } from './components/starship/star-ship-detail/star-ship-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StarShipListComponent,
    StarshipCardComponent,
    StarShipDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    LazyLoadImagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
