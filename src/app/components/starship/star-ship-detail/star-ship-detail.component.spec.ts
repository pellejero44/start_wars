import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { StarShipDetailComponent } from './star-ship-detail.component';
import { StarWarsService } from 'src/app/services/implementations/star-wars.service';
import { StarWarsServiceMock } from 'src/app/mockers/star-wars.service-mock';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('StarShipDetailComponent', () => {
  let component: StarShipDetailComponent;
  let fixture: ComponentFixture<StarShipDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarShipDetailComponent ],
      providers: [
        { provide: StarWarsService, useClass: StarWarsServiceMock },
        {provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: {get:(id:number)=>{id:5}}}
          }}],
          imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarShipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the StarWarsService and ActivatedRoute',
  inject([StarWarsService, ActivatedRoute], (injectedService: StarWarsService, activatedRoute: ActivatedRoute) => {
    const starWarsServiceTestBed = TestBed.inject(StarWarsService);
    const activatedRouteTestBed = TestBed.inject(ActivatedRoute);
    expect(injectedService).toBe(starWarsServiceTestBed);
    expect(activatedRouteTestBed).toBe(activatedRoute);
  }));

  it('should render a link to "/starships" in the HTML', () => {
    const href = fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href');
    expect(href).toEqual('/starships');
  });

  it('should render a h3 and 8 paragraphs in the HTML', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('h3').length).toBe(1);
    expect(compiled.querySelectorAll('p').length).toBe(8);
  });

  it('should call unsubscribe() on ngOnDestroy', () => {
    const spy = spyOn(component['subscription'], 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
