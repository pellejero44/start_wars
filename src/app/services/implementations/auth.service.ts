import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { IAuthService } from '../interfaces/i-auth-service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {


  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }


  private showLoginOrLogoutMessage(mssg: string, icon: string): void {
    this.snackBar.open(mssg, icon, {
      duration: 2500,
      verticalPosition: 'top',
    });
  }

  public signUp(user: User): Observable<User> {
    return this.http.post<User>(`${environment.localUrl}/signup`, { user });
  }

  public logIn(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.localUrl}/login`, { email, password });
  }

  public isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');
    return jwtToken !== null ? true : false;
  }

  public signUpResponse(): void {
    this.showLoginOrLogoutMessage('your account has been created successfully!', 'please log in');
  }

  public logOutResponse(): void {
    this.showLoginOrLogoutMessage('hope to see you soon!', '😔');
    localStorage.removeItem('jwtToken');
    this.router.navigate(['starships']);
  }

  public logInResponse(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.showLoginOrLogoutMessage('now you are log in!', '😊');
  }

}
