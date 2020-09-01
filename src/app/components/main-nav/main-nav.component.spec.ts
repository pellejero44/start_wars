import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { State } from 'src/app/store/reducers/auth.reducers';
import { By } from '@angular/platform-browser';
import { MainNavComponent } from './main-nav.component';


describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  let mockStore: MockStore;

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

  it('should render the "Log in" action and display a locker icon next to "Top secret" tab', () => {
    expect(fixture.debugElement.query(By.css('.locker'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.logInLink'))).toBeTruthy();
  });

  it('should render the "Log out" action and hide the locker icon next to "Top secret" tab, when the user is logged in', () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.locker'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.logOutLink'))).toBeTruthy();
  });

  it('should set true in var "isShowing" when showLoginSideNav method is called', () => {
    component.showLoginSideNav();
    expect(component.isShowing).toBeTrue();
  });

  it('should set dispatch  an action, when logOut method is called', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    component.logOut();
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call unsubscribe() on ngOnDestroy', () => {
    const privateVar = 'subscription';
    const spy = spyOn(component[privateVar], 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

});


