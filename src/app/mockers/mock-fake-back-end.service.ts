import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';

let users: User[] = JSON.parse(localStorage.getItem('users')) || [];


export class MockFakeBackEndService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/signup') && method === 'POST':
          return signUp();
        case url.endsWith('/login') && method === 'POST':
          return logIn();
        default:
          return next.handle(request);
      }
    }


    function signUp() {
      const { user } = body;
      console.log('5 ' + JSON.stringify(user));

      if (users.find(x => x.email === user.email)) {
        return error('Username "' + user.email + '" is already taken')
      }

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok(user);
    }

    function logIn() {
      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);
      if (!user) return error('Username or password is incorrect');
      user.token = 'fake-jwt-token';
      return ok(user)
    }


    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }
  }
}
