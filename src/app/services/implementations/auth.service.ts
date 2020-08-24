import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/i-auth-service';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {


  loggedIn$ = new BehaviorSubject(false);

  constructor() {
  }
  signup(): void {
    
  }

  login(username: string, password: string): Observable<any> {
    if (username === 'username' && password === 'password') {
      localStorage.setItem('username', username);
      this.loggedIn$.next(true);
      return Observable.of(true)
    }else{
      return Observable.of(false)
    }
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    this.loggedIn$.next(this.getUser() !== null);
    return this.loggedIn$;
  }

  logout() {
    localStorage.removeItem('username');
    this.loggedIn$.next(false);
  }
}
