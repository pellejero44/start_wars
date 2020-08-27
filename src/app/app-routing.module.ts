import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const starshipsModule = () => import('./components/starship/starship.module').then(m => m.StarshipModule);
const secretpageModule = () => import('./components/secret/secret.module').then(m => m.SecretModule);

const routes: Routes = [
  { path: '', redirectTo: 'starships', pathMatch: 'full' },
  { path: '**', redirectTo: 'starships', pathMatch: 'full'},
  { path: 'starships', loadChildren: starshipsModule },
  { path: 'secretpage', loadChildren: secretpageModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
