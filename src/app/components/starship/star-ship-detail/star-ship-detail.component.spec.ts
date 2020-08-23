import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarShipDetailComponent } from './star-ship-detail.component';

describe('StarShipDetailComponent', () => {
  let component: StarShipDetailComponent;
  let fixture: ComponentFixture<StarShipDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarShipDetailComponent ]
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
});
