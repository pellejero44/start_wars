import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { HttpOptions } from '../services/htttp-client.service';
import { starshipPageBackEndResponse } from './starships.example';

@Injectable()
export class HttpClientServiceMock {

  get(options: HttpOptions): Observable<any> {
    return of(starshipPageBackEndResponse);
  }

}