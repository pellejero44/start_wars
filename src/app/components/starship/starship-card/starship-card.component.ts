import { Component, OnInit, Input } from '@angular/core';
import { Starship } from 'src/app/models/starship';

@Component({
  selector: 'app-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.scss']
})
export class StarshipCardComponent implements OnInit {
  @Input() starship: Starship;

  constructor() { }

  ngOnInit(): void {
    this.getStarshipId();
  }

  private getStarshipId():void {
    this.starship.shipId =  this.starship.url.split("/").pop()
  }

  public getImageUrl():string {
    let id = this.starship.url.split("/").filter((item)=>{
      return item !== "";
    }).slice(-1)[0];
    let url = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
    console.log(url);
    return  url;
  }

}