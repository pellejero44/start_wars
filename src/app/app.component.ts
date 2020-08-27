import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/auth.reducers';
import { AuthService } from './services/implementations/auth.service';
import { UserHasAlreadyLoggedInBefore } from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<State>, public auth: AuthService) { }

  public ngOnInit(): void {
    const isLoggedIn = this.auth.isLoggedIn();
    if (isLoggedIn) {
      this.store.dispatch(new UserHasAlreadyLoggedInBefore({}));
    }
  }

}
