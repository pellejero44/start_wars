import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Starship } from 'src/app/models/starship';
import { StarWarsService } from 'src/app/services/implementations/star-wars.service';

@Component({
  selector: 'app-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.scss']
})
export class StarshipCardComponent  {
  @Input() starship: Starship;

  constructor(private starWarsService: StarWarsService,  private router: Router) { }

  public getImageUrl():string {
   return this.starWarsService.getImageUrl(this.starship.url);
  }

  public goToDetail():void{
    let id = this.starWarsService.getId(this.starship.url);
    this.router.navigate(['starships', id]);
  }

}