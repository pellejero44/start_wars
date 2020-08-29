import { TestBed, inject} from '@angular/core/testing';
import { StarWarsService } from './star-wars.service';
import { UrlHandlerService } from '../url-handler.service';
import { HttpClientService} from '../htttp-client.service';
import { HttpClientServiceMock } from 'src/app/mockers/HttpClientServiceMock';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { starshipPageExpectedRespone } from 'src/app/mockers/starships.example';



fdescribe('StarWarsService', () => {
  let service: StarWarsService;
  let urlHandlerService: UrlHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [  
        StarWarsService,
          UrlHandlerService,
         {provide: HttpClientService, useClass: HttpClientServiceMock}
        ],
    });

    service = TestBed.inject(StarWarsService);
    urlHandlerService = TestBed.inject(UrlHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject the service a UrlHandlerService',
  inject([UrlHandlerService], (injectedService: UrlHandlerService)=>{   
    expect(injectedService).toBe(urlHandlerService);
  }));


  it('getAll() should return the expected data and call once to' + 
   'urlHandler method in the injected service of UrlHandlerService', () => {
    spyOn(urlHandlerService, 'urlHandler').and.callThrough();
    service.getAll(1).subscribe((res: PaginatorStarship) => {   
       expect(res).toEqual(starshipPageExpectedRespone);
       expect(urlHandlerService.urlHandler).toHaveBeenCalledTimes(1);
    });
  
  });
})
