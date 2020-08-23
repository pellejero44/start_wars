import { NgModule } from '@angular/core';
import { LazyLoadImagesDirective } from './lazy-load-image.directive';

@NgModule({
  declarations: [LazyLoadImagesDirective],
  exports: [LazyLoadImagesDirective]
})
export class LazyLoadImagesModule { }
