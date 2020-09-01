import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { State } from 'src/app/store/reducers/auth.reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
      declarations: [LoginComponent],
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule],
      providers: [
        MatDialog,
        provideMockStore({ initialState })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email field', () => {
    const email = component.email;
    expect(email.valid).toBeFalsy();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
    email.setValue('dasdasdadsa');
    email.setValue('a');
    expect(email.hasError('minlength')).toBeTruthy();
    expect(email.hasError('pattern')).toBeTruthy();
    email.setValue('angel@gmail.es');
    expect(email.valid).toBeTruthy();
  });

  it('should validate password field', () => {
    const password = component.password;
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
    password.setValue('a');
    expect(password.hasError('minlength')).toBeTruthy();
    password.setValue('angel');
    expect(password.valid).toBeTruthy();
  });

  it('should be possible to submit the form to "onLogin" method when form is valid', () => {
    spyOn(component, 'onLogin').and.callThrough();
    component.email.setValue('angel@gmail.es');
    component.password.setValue('angel');
    expect(component.loginForm.valid).toBeTruthy();
    const loginElement = fixture.debugElement.query(By.css('form'));
    loginElement.triggerEventHandler('ngSubmit', component.loginForm);
    expect(component.onLogin).toHaveBeenCalledTimes(1);
  });

  it('should call unsubscribe() on ngOnDestroy', () => {
    const privateVar = 'subscription';
    const spy = spyOn(component[privateVar], 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

});
