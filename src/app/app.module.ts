import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarshipModule } from './components/starship/starship.module';

@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
    BrowserModule,
       
   
    StarshipModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
