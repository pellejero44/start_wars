import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStarWarsApi } from '../interfaces/i-star-wars-api';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { Starship } from 'src/app/models/starship';


@Injectable({
  providedIn: 'root'
})
export class StarWarsService implements IStarWarsApi{

  constructor(private http: HttpClient) { }

    getAll(page: number): Observable<PaginatorStarship> {
      return this.http.get<PaginatorStarship>('http://swapi.dev/api/starships/?page='+ page);
    }

    getById(id: number): Observable<Starship> {
      return this.http.get<Starship>('http://swapi.dev/api/starships/'+ id);
    }

    getId(urlStarShip:string):string{
      let id = urlStarShip.split("/").filter((item)=>{
        return item !== "";
      }).slice(-1)[0];

      return id;
    }

    getImageUrl(urlStarShip:string):string{      
      let url = `https://starwars-visualguide.com/assets/img/starships/${this.getId(urlStarShip)}.jpg`;
      
      return  url;
    }
 
}
