import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarShipListComponent } from './star-ship-list.component';

describe('StarShipListComponent', () => {
  let component: StarShipListComponent;
  let fixture: ComponentFixture<StarShipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarShipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarShipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
