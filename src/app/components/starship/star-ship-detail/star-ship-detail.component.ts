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
  starship: Starship;
  
  constructor(private route: ActivatedRoute, private starWarsService: StarWarsService) { }

  ngOnInit(): void {
    this.getStarshipById();
  }

  private getStarshipById():void{
    this.route.params.subscribe((params) => {
      this.starWarsService.getById(params['id']).subscribe((starship: Starship) => {  
        this.starship = starship;
      });
    });
  }

  changeSource(event: any): void{
    event.target.src = '../../../../assets/images/notFound.jpg';
  }

}
