import { TestBed } from '@angular/core/testing';

import { HtttpClientService } from './htttp-client.service';

describe('HtttpClientService', () => {
  let service: HtttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
