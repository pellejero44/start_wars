import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IStarWarsApi } from '../interfaces/i-star-wars-api';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { Starship } from 'src/app/models/starship';
import { UrlHandlerService } from '../url-handler.service';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService implements IStarWarsApi {

  constructor(private http: HttpClient, private urlHandlerService: UrlHandlerService) { }

  getAll(page: number): Observable<PaginatorStarship> {
    page++;
    return this.http.get<PaginatorStarship>('http://swapi.dev/api/starships/?page=' + page)
      .pipe(map((response: PaginatorStarship) => {
        response.results = this.urlHandlerService.urlHandler(response.results);

        return response;
      }));
  }

  getById(id: number): Observable<Starship> {
    return this.http.get<Starship>('http://swapi.dev/api/starships/' + id)
      .pipe(map((response: Starship) => {
        response = this.urlHandlerService.urlHandler(response);

        return response;
      }));
  }
}
