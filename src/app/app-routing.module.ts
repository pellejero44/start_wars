import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'starships', pathMatch: 'full'},
  {path: '**', redirectTo: 'starships', pathMatch: 'full'},
  {
    path:'starships',
    loadChildren: './components/starship/starship.module#StarshipModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
