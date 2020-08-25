import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LogIn, SignUp } from 'src/app/store/actions/auth.actions';
import { User } from 'src/app/models/user';
import { State } from 'src/app/store/reducers/auth.reducers';
import { Observable } from 'rxjs';
import { selectAuthState } from 'src/app/store/app.states';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public signUpForm: FormGroup;
  public hide = true;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<State>) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit():void {
    this.signUpForm= this.createForm();

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  private createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  get name() { return this.signUpForm.get('name'); }
  get surname() { return this.signUpForm.get('surname'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }

  onSignUp():void {
    if (this.signUpForm.valid) {
      let userLogin= new User(this.signUpForm.value.email, this.signUpForm.value.password);
      this.store.dispatch(new SignUp(userLogin));
      //this.onResetForm();
    }
  }

  onResetForm(): void {
    this.signUpForm.reset();
  }


}