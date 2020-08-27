import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { IAuthService } from '../interfaces/i-auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {


  constructor(private router: Router, private snackBar: MatSnackBar) {
  }

  private getUsers(): any {
    const userList = localStorage.users;
    if (!userList) {
      localStorage.users = JSON.stringify([]);
    }
    return JSON.parse(localStorage.users);
  }

  private userExist(email: string): boolean {
    const users = this.getUsers();
    for (const user of users) {
      if (user.email === email) {
        return true;
      }
    }
    return false;
  }

  private userCheckCredentials(email: string, password: string): boolean {
    const users = this.getUsers();
    for (const user of users) {
      if (user.email === email && user.password === password) {
        return true;
      }
    }
    return false;
  }

  private showLoginOrLogoutMessage(mssg: string, icon: string): void {
    this.snackBar.open(mssg, icon, {
      duration: 2500,
      verticalPosition: 'top',
    });
  }

  public signUp(username: string, password: string): Observable<boolean> {
    if (username !== '' && password !== '') {
      if (this.userExist(username)) {
        return of(false);
      }
      else {
        return of(true);
      }
    } else {
      return of(false);
    }
  }

  public login(username: string, password: string): Observable<boolean> {
    if (username !== '' && password !== '') {
      if (this.userCheckCredentials(username, password)) {
        localStorage.isLoggedIn = true;
        this.showLoginOrLogoutMessage('now you are log in!', '😊');
        return of(true);
      }
      else {
        return of(false);
      }
    } else {
      return of(false);
    }
  }

  public getUser(): any {
    return localStorage.getItem('username');
  }

  public isLoggedIn(): boolean {
    return localStorage.isLoggedIn === 'true' ? true : false;
  }

  public logout(): void {
    this.showLoginOrLogoutMessage('hope to see you soon!', '😔');
    localStorage.isLoggedIn = false;
    this.router.navigate(['starships']);
  }

  public setUsers(email: string, password: string): void {
    const newUser = new User(email, password);
    const users = this.getUsers();
    users.push(newUser);
    localStorage.users = JSON.stringify(users);
  }

}
