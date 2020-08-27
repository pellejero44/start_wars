import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Starship } from 'src/app/models/starship';

@Component({
  selector: 'app-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.scss']
})
export class StarshipCardComponent {
  @Input() public starship: Starship;

  constructor(private router: Router) { }

  public goToDetail(): void {
    this.router.navigate(['starships', this.starship.id]);
  }
}
