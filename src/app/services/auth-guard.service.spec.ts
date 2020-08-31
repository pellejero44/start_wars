import { TestBed, getTestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './implementations/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthServiceMock } from '../mockers/auth.service-mock';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let injector: TestBed;
  let authService: AuthServiceMock
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: routerSpy }]      
    });
    injector = getTestBed();
    authService = injector.get(AuthService);
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();    
  });

  it('should return true for canActivate()', ()=> {
    authService.isLogIn = true;
    const result = service.canActivate();
    expect(result).toBe(true);
  });

  it('should return false for canActivate() and redirect user to "/starships"', ()=> {
    authService.isLogIn = false;
    const result = service.canActivate();
    expect(result).toBe(false);
    expect (routerSpy.navigate).toHaveBeenCalled();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/starships']);
  });

});
