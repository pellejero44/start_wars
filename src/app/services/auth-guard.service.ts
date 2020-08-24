import { Injectable } from '@angular/core';
import { AuthService } from './implementations/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {
    
  constructor(
      public auth: AuthService,
      public router: Router
    ) { }

    canActivate(): boolean {
      console.log(this.auth.isLoggedIn());
      if (!this.auth.isLoggedIn()) { 
        this.router.navigateByUrl('/starships');
        return false;
      }
      return true;
    }
}
