import { of } from 'rxjs';
import { UrlHandlerService } from '../services/url-handler.service';
import { starshipPageData, starshipDetailData } from './starships.example';
import { HttpClientService } from '../services/htttp-client.service';

const starshipPageExampleResponse = starshipPageData;
const starshipDetailExampleResponse= starshipDetailData;

export class StarWarsServiceMock {

    constructor(private http: HttpClientService, private urlHandlerService: UrlHandlerService, ) { }

  getAll() {
      const data = this.urlHandlerService.urlHandler(starshipPageExampleResponse);
      return of(data);
  }

  getById() {
    const data = this.urlHandlerService.urlHandler(starshipDetailExampleResponse);
    return of(data);
  }
}
