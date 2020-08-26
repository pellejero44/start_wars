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

  public goToDetail():void{
    this.router.navigate(['starships', this.starship.id]);
  }

}