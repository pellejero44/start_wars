import { Observable } from 'rxjs';

export interface IAuthService {
  login(username: string, password: string): Observable<boolean>;
  logout(): void;
  signUp(username: string, password: string): Observable<boolean>;
}
