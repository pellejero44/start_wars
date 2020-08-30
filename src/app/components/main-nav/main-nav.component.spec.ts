import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainNavComponent } from './main-nav.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { State } from 'src/app/store/reducers/auth.reducers';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { By } from '@angular/platform-browser';

fdescribe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  let mockStore: MockStore;
  let mockAppStateSelector: MemoizedSelector<State, AppState>;

  beforeEach(async(() => {

    const initialState: State = {
      isAuthenticated: false,
      user: null,
      errorMessageLogin: null,
      canCloseLoginView: null,
      errorMessageSignUp: null,
      canCloseSignUpView: null
    };

    TestBed.configureTestingModule({
      declarations: [MainNavComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ],
      providers: [
        provideMockStore({ initialState })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => { 
    fixture.destroy();
   });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 href links. "/starships" and "/secretpage" in the HTML', () => {
    
    expect(fixture.nativeElement.parentNode.querySelector('[routerLink="/starships"]')).toBeTruthy();
    expect(fixture.nativeElement.parentNode.querySelector('[routerLink="/secretpage"]')).toBeTruthy();
  });

  it('should render the "Login" action and display a locker icon next to "Top secret" tab', () => {
    expect(fixture.debugElement.query(By.css('.locker'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.logInLink'))).toBeTruthy();
  });

});
