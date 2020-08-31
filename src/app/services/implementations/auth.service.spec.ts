import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserApiService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        AuthService,
        MatDialog,
        { provide: Router, useValue: routerSpy }
      ],
    });
    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in the user', () => {
    let email = 'user@testing.es';
    let password = 'testing';
    let expectedResponse = new User('user@testing.es', 'testing');

    service.logIn('user@testing.es', 'testing').subscribe((res) => {
      expect(res).toEqual(expectedResponse);
    });
    const req = httpMock.expectOne(`${environment.localUrl}/login`);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ email, password });

    req.flush(expectedResponse);
  });

  it('should sign up the user', () => {
    let userBody = new User('user@testing.es', 'testing');
    let expectedResponse = new User('user@testing.es', 'testing');

    service.signUp(userBody).subscribe((res) => {
      expect(res).toEqual(expectedResponse);
    });
    const req = httpMock.expectOne(`${environment.localUrl}/signup`);
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });

  it('should return if the user is logged in, when isLoggedIn method is called', () => {
    localStorage.removeItem('jwtToken');
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return a message, when signUpResponse method is called', () => {
    const spy = spyOn<any>(service, 'showLoginOrLogoutMessage').and.callThrough();
    service.signUpResponse();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should remove the token, return a message and navigate to home, when logOutResponse method is called', () => {
    const spyMssg = spyOn<any>(service, 'showLoginOrLogoutMessage').and.callThrough();
    const spyLocaltorage = spyOn(localStorage, 'removeItem').and.callThrough();
    service.logOutResponse();
    expect(spyMssg).toHaveBeenCalledTimes(1);
    expect(spyLocaltorage).toHaveBeenCalledTimes(1);
    expect (routerSpy.navigate).toHaveBeenCalled();
    expect (routerSpy.navigate).toHaveBeenCalledWith (['starships']);
  });

  it('should add the token and return a message, when logInResponse method is called', () => {
    const spyMssg = spyOn<any>(service, 'showLoginOrLogoutMessage').and.callThrough();
    const spyLocaltorage = spyOn(localStorage, 'setItem').and.callThrough();
    service.logInResponse('token');
    expect(spyMssg).toHaveBeenCalledTimes(1);
    expect(spyLocaltorage).toHaveBeenCalledTimes(1);
  });

});
