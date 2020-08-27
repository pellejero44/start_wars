import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { StarWarsService } from 'src/app/services/implementations/star-wars.service';


@Component({
  selector: 'app-star-ship-list',
  templateUrl: './star-ship-list.component.html',
  styleUrls: ['./star-ship-list.component.scss']
})
export class StarShipListComponent implements OnInit {

  public page: number;
  public pagesize: number;
  public paginatorStarship: PaginatorStarship;

  constructor(private starWarsService: StarWarsService) { }

  public ngOnInit(): void {
    this.page = 0;
    this.pagesize = 0;
    this.getPage();
  }

  public changePage(pageEv: PageEvent): void {
    this.page = pageEv.pageIndex;

    this.getPage();
  }

  public getPage(): void {
    this.starWarsService.getAll(this.page)
      .subscribe((pageResult: PaginatorStarship) => {
        this.paginatorStarship = pageResult;
        if (this.pagesize === 0) {
          this.pagesize = pageResult.results.length;
        }
      });
  }
}
