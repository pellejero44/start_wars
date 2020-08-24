import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarshipModule } from './components/starship/starship.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UserModule } from './components/user/user.module';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    StarshipModule,
    AppRoutingModule,
    UserModule,    
  ],
  declarations: [
    AppComponent,
    MainNavComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
