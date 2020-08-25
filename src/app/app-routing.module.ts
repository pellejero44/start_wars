import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'starships', pathMatch: 'full'},
  {path: '**', redirectTo: 'starships', pathMatch: 'full'},
  {
    path:'starships',
    loadChildren: () => import('./components/starship/starship.module').then(m=> m.StarshipModule)
  },
  {
    path:'secretpage',  
    loadChildren: () => import('./components/secret/secret.module').then(m=> m.SecretModule)    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
