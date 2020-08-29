import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { HttpOptions } from '../services/htttp-client.service';
import { starshipPageBackEndResponse, starshipDetailBackEndResponse } from './starships.example';

@Injectable()
export class HttpClientServiceMock {

  get(options: HttpOptions): Observable<any> {
    if (options.url.indexOf('page') !== -1) {
      return of(starshipPageBackEndResponse);
    } else {
      return of(starshipDetailBackEndResponse);
    }
  }

}