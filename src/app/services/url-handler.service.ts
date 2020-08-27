import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlHandlerService {

  constructor() { }

  private getImageUrl(urlStarShip: string): string {
    const url = `https://starwars-visualguide.com/assets/img/starships/${this.getId(urlStarShip)}.jpg`;

    return url;
  }

  private getId(urlStarShip: string): string {
    const id = urlStarShip.split('/').filter((item) => {
      return item !== '';
    }).slice(-1)[0];

    return id;
  }

  public urlHandler(value: any): any {
    if (value instanceof Array) {
      value.map((item) => {
        item.id = this.getId(item.url);
        item.url = this.getImageUrl(item.url);
      });
    } else {
      value.id = this.getId(value.url);
      value.url = this.getImageUrl(value.url);
    }
    return value;
  }



}
