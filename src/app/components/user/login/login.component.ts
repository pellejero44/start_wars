import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public loginForm: FormGroup;
  public hide = true;
  //constructor(private authSvc: AuthService, private route: Router) {}

  ngOnInit() {
    this.loginForm= this.createForm();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onLogin():void {
    if (this.loginForm.valid) {
      this.onResetForm();
    }
    // this.authSvc
    //   .loginByEmail(form)
    //   .then(res => {
    //     console.log('Successfully', res);
    //     this.route.navigate(['/']);
    //   })
    //   .catch(err => console.log('Error', err));
  }

  onResetForm(): void {
    this.loginForm.reset();
  }

}
