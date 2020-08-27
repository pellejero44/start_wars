import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app/material.module';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  entryComponents: [SignUpComponent],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent,
    SignUpComponent
  ]
})
export class UserModule { }
