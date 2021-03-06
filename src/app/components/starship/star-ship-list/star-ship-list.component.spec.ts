import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StarShipListComponent } from './star-ship-list.component';
import { StarWarsService } from 'src/app/services/implementations/star-wars.service';
import { StarWarsServiceMock } from 'src/app/mockers/star-wars.service-mock';
import { By } from '@angular/platform-browser';


describe('StarShipListComponent', () => {
  let component: StarShipListComponent;
  let fixture: ComponentFixture<StarShipListComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarShipListComponent],
      providers: [{ provide: StarWarsService, useClass: StarWarsServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatPaginatorModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarShipListComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the StarWarsService',
    inject([StarWarsService], (injectedService: StarWarsService) => {
      const starWarsServiceTestBed = TestBed.inject(StarWarsService);
      expect(injectedService).toBe(starWarsServiceTestBed);
    }));

  it('should have "paginatorStarship" populated and start in the first page', async(() => {
    expect(component.page).toBe(0);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('app-starship-card')).length).toBeGreaterThan(0);
    });
  }));

  it('should render in the HTML as much app-starship-card as the value of pagesize', () => {
    expect(compiled.querySelectorAll('app-starship-card').length).toBe(component.pagesize);
  });

  it('should call getPage() method and getAll method of starWarsService on component Init', () => {
    const privateMethod = 'starWarsService';
    spyOn(component, 'getPage').and.callThrough();
    spyOn(component[privateMethod], 'getAll').and.callThrough();
    component.ngOnInit();
    expect(component.getPage).toHaveBeenCalled();
    expect(component[privateMethod].getAll).toHaveBeenCalled();
  });

  it('should call one getPage() when next page event in paginator is fire', () => {
    spyOn(component, 'getPage').and.callThrough();
    component.paginator.nextPage();
    expect(component.getPage).toHaveBeenCalledTimes(1);
  });

  it('should disabled previous page button in paginator when pageIndex === 0', () => {
    expect(component.page).toBe(0);
    expect(component.paginator.hasPreviousPage()).toBeFalse();
  });

  it('should abled previous page button in paginator, after navigate to next page', () => {
    component.paginator.nextPage();
    expect(component.page).toBe(1);
    expect(component.paginator.hasPreviousPage()).toBeTrue();
    component.paginator.previousPage();
    expect(component.page).toBe(0);
  });

});



