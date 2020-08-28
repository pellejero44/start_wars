import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

export interface IAuthService {
  logIn(username: string, password: string): Observable<User>;
  signUp(username: User, password: string): Observable<User>;
}
