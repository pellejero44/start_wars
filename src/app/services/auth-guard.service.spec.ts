import { TestBed, getTestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './implementations/auth.service';
import { Router} from '@angular/router';
import { AuthServiceMock } from '../mockers/auth.service-mock';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let injector: TestBed;
  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: routerSpy }]
    });
    injector = getTestBed();
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for canActivate()', () => {
    localStorage.setItem('fakeToken', 'token');
    const result = service.canActivate();
    expect(result).toBe(true);
  });

  it('should return false for canActivate() and redirect user to "/starships"', () => {
    localStorage.removeItem('fakeToken');
    const result = service.canActivate();
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/starships']);
  });

});
