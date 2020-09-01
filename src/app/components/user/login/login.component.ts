import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { LogIn, LogOut } from 'src/app/store/actions/auth.actions';
import { User } from 'src/app/models/user';
import { State } from 'src/app/store/reducers/auth.reducers';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Observable, Subscription } from 'rxjs';
import { selectAuthState } from 'src/app/store/app.states';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private getState$: Observable<any>;
  public loginForm: FormGroup;
  public hide = true;
  public errorMessage: string | null;

  public get email() { return this.loginForm.get('email'); }
  public get password() { return this.loginForm.get('password'); }

  constructor(private store: Store<State>, private signupDialog: MatDialog, private formBuilder: FormBuilder) {
    this.getState$ = this.store.pipe(select(selectAuthState));
  }

  public ngOnInit() {
    this.loginForm = this.createForm();

    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessageLogin;
      if (state.isAuthenticated) {
        this.onResetForm();
      }
    });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });


  }

  private onResetForm(): void {
    this.loginForm.reset();
  }

  public onLogin(): void {
    if (this.loginForm.valid) {
      const userLogin = new User(this.loginForm.value.email, this.loginForm.value.password);
      this.store.dispatch(new LogIn(userLogin));
    }
  }

  public openSignUp(): void {
    this.signupDialog.open(SignUpComponent, { disableClose: true });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
