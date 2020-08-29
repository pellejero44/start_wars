import { of } from 'rxjs';
import { starshipPageExpectedRespone, starshipDetailExpectedResponse } from './starships.example';

export class StarWarsServiceMock {


  getAll() {
      return of(starshipPageExpectedRespone);
  }

  getById() {
    return of(starshipDetailExpectedResponse);
  }
}
