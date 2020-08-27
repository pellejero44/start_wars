import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[ldImages]'
})
export class LazyLoadImagesDirective implements OnInit, OnDestroy {
  private intersectionObserver: IntersectionObserver;
  private rootElement: HTMLElement;
  @Output() public inViewportChange = new EventEmitter<boolean>();
  @Output() public loadErrorEmitter = new EventEmitter<boolean>();
  @Output() public imagesInViewPortEmitter = new EventEmitter<void>();

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.rootElement = element.nativeElement;
  }

  public ngOnInit() {
    this.init();
  }

  public ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private init(): void {
    this.registerIntersectionObserver();
    this.observeDOMChanges(this.rootElement);
  }

  private registerIntersectionObserver(): IntersectionObserver {
    this.intersectionObserver = new IntersectionObserver(
      images => images.forEach(image => this.onIntersectionChange(image))
    );

    return this.intersectionObserver;
  }

  private observeDOMChanges(rootElement: HTMLElement): MutationObserver {
    const observer = new MutationObserver(mutations => this.observeAllImagesInDOM());

    const observerConfig = {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    };

    observer.observe(rootElement, observerConfig);

    this.observeAllImagesInDOM();

    return observer;
  }

  private observeAllImagesInDOM(): void {
    const imagesFoundInDOM = this.getAllImagesToLazyLoad(this.rootElement);
    imagesFoundInDOM.forEach((image: HTMLElement) => this.intersectionObserver.observe(image));
  }

  private getAllImagesToLazyLoad(pageNode: HTMLElement) {
    return Array.from(pageNode.querySelectorAll('img[data-src]'));
  }

  private onIntersectionChange(image: IntersectionObserverEntry) {
    if (!image.isIntersecting) {
      this.imagesInViewPortEmitter.emit();
      return;
    }

    this.onImageAppearsInViewport(image.target);
  }

  private onImageAppearsInViewport(image: any) {
    if (image.dataset.src) {
      this.renderer.setAttribute(image, 'src', image.dataset.src);
      this.renderer.listen(image, 'error', (event) => {
        this.renderer.setAttribute(image, 'src', '/assets/images/notFound.jpg');
        this.loadErrorEmitter.emit(true);
      });
      this.renderer.removeAttribute(image, 'data-src');
      this.inViewportChange.emit(true);
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(image);
    }
  }
}
