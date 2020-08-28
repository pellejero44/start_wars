import { Injectable } from '@angular/core';
import { AuthService } from './implementations/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  public canActivate(): boolean {
    const isLoggedIn = this.auth.isLoggedIn();
    if (isLoggedIn === false) {
      this.router.navigate(['/starships']);
      return false;
    }
    return true;
  }
}
