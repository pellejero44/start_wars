import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports:[
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ]
})
export class UserModule { }
