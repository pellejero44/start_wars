
import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[default]'
})
export class ErrorHandlerImageDirective {
  @Input() public default: string;

  constructor(private element: ElementRef) { }

  @HostListener('error')
  public updateUrl() {
    const attribute = 'src';
    this.element.nativeElement.attributes[attribute].value = this.default;
  }
}
