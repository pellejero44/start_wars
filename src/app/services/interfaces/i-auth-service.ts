import { Observable } from 'rxjs';

export interface IAuthService {
    login(username: string, password: string): Observable<any>;
    logout(): void;
    signup():void;
  }
  