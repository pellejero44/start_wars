import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecretComponent } from './secret.component';
import { AuthGuardService as AuthGuard } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'secretpage',
    component: SecretComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretRoutingModule { }
