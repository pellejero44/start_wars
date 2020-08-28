import { TestBed } from '@angular/core/testing';

import { MockFakeBackEndService } from './mock-fake-back-end.service';

describe('MockFakeBackEndService', () => {
  let service: MockFakeBackEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockFakeBackEndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
