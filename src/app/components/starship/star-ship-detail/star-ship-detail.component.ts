import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Starship } from 'src/app/models/starship';
import { StarWarsService } from 'src/app/services/implementations/star-wars.service';

@Component({
  selector: 'app-star-ship-detail',
  templateUrl: './star-ship-detail.component.html',
  styleUrls: ['./star-ship-detail.component.scss']
})
export class StarShipDetailComponent implements OnInit {
  public starship: Starship;

  constructor(private route: ActivatedRoute, private starWarsService: StarWarsService) { }

  public ngOnInit(): void {
    this.getStarshipById();
  }

  private getStarshipById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.starWarsService.getById(id).subscribe((starship: Starship) => {
      this.starship = starship;
    });
  }

}
