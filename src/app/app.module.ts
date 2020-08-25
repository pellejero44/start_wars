import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarshipModule } from './components/starship/starship.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UserModule } from './components/user/user.module';
import { MaterialModule } from './material.module';
import { AuthService } from './services/implementations/auth.service';
import { SecretModule } from './components/secret/secret.module';

// ngrx
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import {reducers} from './store/app.states';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    StarshipModule,
    SecretModule,    
    UserModule,  
    AppRoutingModule,  
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
