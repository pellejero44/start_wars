import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LogOut } from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers/auth.reducers';
import { selectAuthState } from 'src/app/store/app.states';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{

  getState: Observable<any>;
  isAuthenticated: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
   
  constructor(private breakpointObserver: BreakpointObserver, private store: Store<State>) {
    this.getState = this.store.select(selectAuthState);
  }
  
  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });
  }

  public logOut():void{
    this.store.dispatch(new LogOut({}));
  }
 
}
