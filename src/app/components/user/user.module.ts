import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule}   from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class UserModule { }
