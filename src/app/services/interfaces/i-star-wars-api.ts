import { Observable } from 'rxjs';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { Starship } from 'src/app/models/starship';


export interface IStarWarsApi {
  getAll(page: number): Observable<PaginatorStarship>;
  getById(id: number): Observable<Starship>;
}
