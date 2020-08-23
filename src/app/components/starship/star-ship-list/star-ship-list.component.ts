import { Component, OnInit } from '@angular/core';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { StarWarsService } from 'src/app/services/implementations/star-wars.service';

@Component({
  selector: 'app-star-ship-list',
  templateUrl: './star-ship-list.component.html',
  styleUrls: ['./star-ship-list.component.scss']
})
export class StarShipListComponent implements OnInit {
 
  private page:number;
  paginatorStarship: PaginatorStarship;
 
  constructor(private starWarsService: StarWarsService) { }

  ngOnInit(): void {
    this.page=1;
    this.getPage();
  }

  getPage():void{
    this.starWarsService.getAll(this.page)
    .subscribe((pageResult: PaginatorStarship)=> {
      this.paginatorStarship = pageResult;
    })
  }
}