import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { StarshipCardComponent } from './starship-card.component';
import { Starship } from 'src/app/models/starship';
import { starshipDetailExpectedResponse } from 'src/app/mockers/starships.example';


@Component({
  selector: 'test-component-wrapper',
  template: '<app-starship-card [starship]="starship"></app-starship-card>'
})
class TestComponentWrapper {
  starship: Starship = starshipDetailExpectedResponse;
}

describe('StarshipCardComponent', () => {
  let component: StarshipCardComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, StarshipCardComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create StarshipCardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should inject Router',
  inject([Router], (router: Router) => {
    const routerTestBed = TestBed.inject(Router);
    expect(router).toBe(routerTestBed);
  }));

  it('starships var should receive value from parent', () => {
    expect(component.starship).toBe(fixture.componentInstance.starship);
  });

  it('should render 1 title and 1 image in the HTML', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('h3').length).toBe(1);
    expect(compiled.querySelectorAll('img').length).toBe(1);
  });

  it('should call to goToDetail method and navigate to starship detail route, when the card got clicked', () => {
    spyOn(component, 'goToDetail').and.callThrough();
    const leftMouseButton = 0;
    const firstLink = fixture.debugElement.query(By.css('mat-card'));
    firstLink.triggerEventHandler('click', { button: leftMouseButton });
    expect (component.goToDetail).toHaveBeenCalled();
    expect (routerSpy.navigate).toHaveBeenCalled();
    expect (routerSpy.navigate).toHaveBeenCalledWith (['starships', component.starship.id]);
  });
});
