import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarshipModule } from './components/starship/starship.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UserModule } from './components/user/user.module';
import { MaterialModule } from './material.module';
import { AuthService } from './services/implementations/auth.service';
import { SecretModule } from './components/secret/secret.module';

import { MockFakeBackEndService } from './mockers/mock-fake-back-end.service';
import { HttpClientService } from './services/htttp-client.service';
import { CacheService } from './services/cache.service';

// ngrx
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import {reducer} from '../app/store/reducers/auth.reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';





@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,   
    StarshipModule,
    SecretModule,
    UserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({authReducer: reducer}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    AuthService,
    HttpClientService,
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockFakeBackEndService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
