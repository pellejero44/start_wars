import { TestBed } from '@angular/core/testing';

import { CacheService, LocalStorageSaveOptions } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
    service = TestBed.inject(CacheService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data in localstorage', () => {
    const spyLocaltorage = spyOn(localStorage, 'setItem').and.callThrough();
    let localStorageDataOpts = new LocalStorageSaveOptions();
    localStorageDataOpts.data = 'juan';
    localStorageDataOpts.key = 'juan';
    localStorageDataOpts.expirationMins = 1;
    service.save(localStorageDataOpts);
    expect(spyLocaltorage).toHaveBeenCalledTimes(1);
  });

  it('should ask for data in localstorage', () => {
    const spyLocaltorage = spyOn(localStorage, 'getItem').and.callThrough();
    const result =  service.load('keyAux');
    expect(result).toBe(null);
    expect(spyLocaltorage).toHaveBeenCalledTimes(1);
  });
});
