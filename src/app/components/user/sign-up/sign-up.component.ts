import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SignUp } from 'src/app/store/actions/auth.actions';
import { User } from 'src/app/models/user';
import { State } from 'src/app/store/reducers/auth.reducers';
import { selectAuthState } from 'src/app/store/app.states';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  private getState$: Observable<any>;
  private subscription: Subscription;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public signUpForm: FormGroup;
  public hide = true;
  public errorMessage: string | null;
  @ViewChild('buttonToCloseDialog', { read: ElementRef }) public buttonToCloseDialog: ElementRef;

  public get name() { return this.signUpForm.get('name'); }
  public get surname() { return this.signUpForm.get('surname'); }
  public get email() { return this.signUpForm.get('email'); }
  public get password() { return this.signUpForm.get('password'); }

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.getState$ = this.store.pipe(select(selectAuthState));
  }

  public ngOnInit(): void {
    this.signUpForm = this.createForm();
    this.subscription = this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessageSignUp;

      if (state.canCloseSignUpView) {
        this.closeDialog();
      }

    });
  }

  public closeDialog(): void {
    this.buttonToCloseDialog.nativeElement.click();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      surname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }



  public onSignUp(): void {
    if (this.signUpForm.valid) {
      const userLogin = new User(this.signUpForm.value.email, this.signUpForm.value.password);
      this.store.dispatch(fromAuthActions.SignUp({user: userLogin}));
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
