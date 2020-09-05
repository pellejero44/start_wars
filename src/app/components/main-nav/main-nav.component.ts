import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers/auth.reducers';
import { selectAuthState } from 'src/app/store/app.states';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private getState$: Observable<any>;
  public isAuthenticated: boolean;
  public isShowing: boolean;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<State>) {
    this.getState$ = this.store.pipe(select(selectAuthState));
  }

  public ngOnInit(): void {
    this.isAuthenticated = false;
    this.hideLoginSideNav();

    this.subscription = this.getState$.subscribe((state) => {
      if (state.canCloseLoginView != null) {
        if (state.canCloseLoginView) {
          this.hideLoginSideNav();
        }
        else {
          this.showLoginSideNav();
        }
      }
      this.isAuthenticated = state.isAuthenticated;
    });
  }

  public showLoginSideNav(): void {
    this.isShowing = true;
  }

  public hideLoginSideNav(): void {
    this.isShowing = false;
  }

  public logOut(): void {
    this.store.dispatch(fromAuthActions.LogOut());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
