import { Component, OnInit, EventEmitter} from '@angular/core';
import { async, TestBed, ComponentFixture} from '@angular/core/testing';
import { ImageJSON } from 'src/app/models/imageJsSON-model';
import { LazyLoadImagesDirective } from './lazy-load-image.directive';

@Component({
    selector: 'app-test-container',
    template: `
    <div  class="image-list imageContainer" ldImages (inViewportChange)="imageIsIntersecting($event)" 
    (onLoadError)="imageFailLoadHandler($event)" (imagesInViewPortEmitter)="imagesViewPortHandler($event)">
        <div *ngFor="let imageJSON of imageJSON_List;">
            <div class="row">
                <div class="col-xl-6 col-sl-12">
                    <img [attr.data-src]='imageJSON.photo' class="imgJSON">
                </div>
                <div class="col-xl-6 col-sl-12">
                    <p class="figure-caption">{{imageJSON.text}}</p>
                </div>
            </div>
        </div>
    </div>
    `
  })
  class ContainerComponent implements OnInit {
    private imageLoadedCounter:number;
    private imageFailedEmiter:EventEmitter<boolean> = new EventEmitter();     
    private imagesViewPortEmiter: EventEmitter<void>= new EventEmitter();
    public imageJSON_List: ImageJSON[];

    constructor() { }
  
    ngOnInit(): void {
        this.imageLoadedCounter=0;
        this.imageJSON_List= [];
        this.createJSON();
    }

    private getRandomText(): string {
      let text =['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
       'Vivamus iaculis condimentum turpis eu molestie. Sed sed lectus sit amet nulla ornare eleifend.',
       'Nullam pretium suscipit magna, lacinia elementum lacus ultrices eu. Quisque mollis viverra semper.',
       'Cras quis tincidunt mi.',
       'Phasellus quis lorem et nisl fermentum varius eget sit amet arcu.',
       'Donec malesuada, libero sed condimentum fermentum, ex urna blandit mi, sed auctor libero elit sed augue.',
       'Mauris quis vulputate ligula. Curabitur est lacus, iaculis at imperdiet vel, egestas sed justo.',
       'Duis feugiat enim vel augue varius consectetur.' ,
       'Donec porta, ipsum ut lacinia scelerisque, sem turpis venenatis tortor, ac molestie lectus massa eleifend tellus.',
       'Sed feugiat eleifend massa, ut volutpat ante ullamcorper quis. In dictum elementum turpis.'];    
       let randomNumber = Math.floor(Math.random() * text.length)
        let randomText=  text[randomNumber];

       return randomText;
    }

    private createJSON():void{
      for(let i =0; i< 40; i++){
        if(i==2)
          this.imageJSON_List.push(new ImageJSON(i+'','https://picsum.photos/id/'+i+'fake/500/500', this.getRandomText()));
        else
          this.imageJSON_List.push(new ImageJSON(i+'','https://picsum.photos/id/'+i+'/500/500', this.getRandomText()));
      }
    }

    public imageIsIntersecting():void{
      this.imageLoadedCounter++;   
    }

    public imageFailLoadHandler():void{
      this.imageFailedEmiter.emit(true);     
    }

    public imagesViewPortHandler():void{
      this.imagesViewPortEmiter.emit();   
    }

}
describe('LazyLoadImagesDirective', () => {
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;
    let compiled: HTMLElement;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContainerComponent,
                LazyLoadImagesDirective
            ]
          });
      }));

      beforeEach(async(() => {
        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;   
                
      }));

      it('should create the componet', () => {
        expect(component).toBeTruthy();
        fixture.detectChanges();  
      });

      it('The last img that is in the viewport, his src doesnt should be null', (done:DoneFn) => {
        component['imagesViewPortEmiter'].subscribe(() => {          
          let source= compiled.querySelectorAll('img')[0].getAttribute('src');
          expect(source).not.toBeNull();
          done();
        });   
        fixture.detectChanges();      
      });

      it('The last img that is not in the viewport, his src should be null', (done:DoneFn) => {       
        component['imagesViewPortEmiter'].subscribe(() => {
          const imagesFoundInDOM = compiled.querySelectorAll('img');
          let source= imagesFoundInDOM[imagesFoundInDOM.length - 1].getAttribute('src');
          expect(source).toBeNull();
          done();
        });
        fixture.detectChanges();      
      });


      it('if there are 40 images to load, the viewport only load the images that are in the viewport', 
      (done:DoneFn) => { 
        component['imagesViewPortEmiter'].subscribe(() => {          
          expect(component['imageLoadedCounter']).toBeLessThan(40); 
          done();
        });
        fixture.detectChanges();    
      });

       it('if some image fail on load, the image will  load an auxiliar image', (done:DoneFn) => {       
        component['imageFailedEmiter'].subscribe((x) => {
          expect(x).toBe(true); 
          done();
        });  
        fixture.detectChanges();  
      });


  });
      



