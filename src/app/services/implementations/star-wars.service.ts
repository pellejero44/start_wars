import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IStarWarsApi } from '../interfaces/i-star-wars-api';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { Starship } from 'src/app/models/starship';
import { UrlHandlerService } from '../url-handler.service';
import { HttpClientService } from '../htttp-client.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService implements IStarWarsApi {


  constructor(private http: HttpClientService, private urlHandlerService: UrlHandlerService) { }

  getAll(page: number): Observable<PaginatorStarship> {
    page++;
    return this.http.get<PaginatorStarship>({ url: `${environment.swapiUrl}/starships/?page=${page}`, cacheMins: 5 })
      .pipe(map((response: PaginatorStarship) => {
        response.results = this.urlHandlerService.urlHandler(response.results);

        return response;
      }));
  }

  getById(id: number): Observable<Starship> {
    return this.http.get<Starship>({ url: `${environment.swapiUrl}/starships/${id}`, cacheMins: 5 })
      .pipe(map((response: Starship) => {
        response = this.urlHandlerService.urlHandler(response);

        return response;
      }));
  }
}
