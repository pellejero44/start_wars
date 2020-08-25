import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/i-auth-service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {


  constructor(private router: Router) {
  }

  private getUsers(): any{
    let userList = localStorage.users;
    if(!userList){
      localStorage.users = JSON.stringify([]);
    }
    return JSON.parse(localStorage.users);
  }

  private userExist(email:string):boolean{
    let users= this.getUsers();
    for(let user of users){
        if(user.email == email)
          return true;
    }
    return false;
  }

  private userCheckCredentials(email:string, password: string):boolean{
    let users= this.getUsers();
    for(let user of users){
      if(user.email == email && user.password == password)
        return true;
    }
    return false;
  }

  signUp(username: string, password: string): Observable<boolean> {
    if (username !== '' && password !== '') {
      if(this.userExist(username))
        return Observable.of(false);
      else
        return Observable.of(true);    
    }else{
      return Observable.of(false)
    }
  }

  login(username: string, password: string): Observable<boolean> {
    if (username !== '' && password !== '') {
      if(this.userCheckCredentials(username, password)){
        localStorage.isLoggedIn=true;
        return Observable.of(true);
      }
      else
        return Observable.of(false);
    }else{
      return Observable.of(false)
    }
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return localStorage.isLoggedIn === 'true' ? true: false;
  }

  logout():void {
    localStorage.isLoggedIn=false;
    this.router.navigate(['starships']);
  }

  public setUsers(email:string, password: string):void {
    let newUser = new User(email, password);
    let users = this.getUsers();
    users.push(newUser);
    localStorage.users = JSON.stringify(users);
  }
  
}
