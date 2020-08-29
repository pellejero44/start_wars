import { TestBed, inject} from '@angular/core/testing';
import { StarWarsService } from './star-wars.service';
import { UrlHandlerService } from '../url-handler.service';
import { HttpClientService} from '../htttp-client.service';
import { HttpClientServiceMock } from 'src/app/mockers/HttpClientServiceMock';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { starshipPageExpectedRespone, starshipDetailExpectedResponse } from 'src/app/mockers/starships.example';
import { Starship } from 'src/app/models/starship';



describe('StarWarsService', () => {
  let service: StarWarsService;
  let urlHandlerServiceTesbed: UrlHandlerService;
  let httpClientServiceTesBed: HttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [  
        StarWarsService,
          UrlHandlerService,
         {provide: HttpClientService, useClass: HttpClientServiceMock}
        ],
    });

    service = TestBed.inject(StarWarsService);
    urlHandlerServiceTesbed = TestBed.inject(UrlHandlerService);
    httpClientServiceTesBed = TestBed.inject(HttpClientService);
    spyOn(urlHandlerServiceTesbed, 'urlHandler').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject the UrlHandlerService',
  inject([UrlHandlerService], (injectedService: UrlHandlerService)=>{   
    expect(injectedService).toBe(urlHandlerServiceTesbed);
  }));

  it('should inject the HttpClientService',
  inject([HttpClientService], (injectedService: HttpClientService)=>{   
    expect(injectedService).toBe(httpClientServiceTesBed);
  }));

  it('getAll() should return the expected data and call once to' + 
   'urlHandler method in the injected service of UrlHandlerService', () => {   
    service.getAll(1).subscribe((res: PaginatorStarship) => {   
       expect(res).toEqual(starshipPageExpectedRespone);
       expect(urlHandlerServiceTesbed.urlHandler).toHaveBeenCalledTimes(1);
    });
  });

  it('getById() should return the expected data and call once to' + 
  'urlHandler method in the injected service of UrlHandlerService', () => {
   service.getById(2).subscribe((res: Starship) => {   
      expect(res).toEqual(starshipDetailExpectedResponse);
      expect(urlHandlerServiceTesbed.urlHandler).toHaveBeenCalledTimes(1);
   });
 });

})
