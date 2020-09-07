import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { PaginatorStarship } from 'src/app/models/paginator-starship';
import { StarWarsService } from 'src/app/services/implementations/star-wars.service';

@Component({
  selector: 'app-star-ship-list',
  templateUrl: './star-ship-list.component.html',
  styleUrls: ['./star-ship-list.component.scss']
})
export class StarShipListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public page: number;
  public pagesize: number;
  public paginatorLength: number;
  public paginatorStarship: PaginatorStarship;
  public paginatorStarship$: Observable<PaginatorStarship>;

  constructor(private starWarsService: StarWarsService) { }

  public ngOnInit(): void {
    this.page = 0;
    this.pagesize = 0;
    this.paginatorLength = 0;
    this.getPage();
  }

  public changePage(pageEv: PageEvent): void {
    this.page = pageEv.pageIndex;

    this.getPage();
  }

  public getPage(): void {
    this.paginatorStarship$ = this.starWarsService.getAll(this.page).pipe(
      tap(pageResult => {
        this.paginatorLength = pageResult.count;
        if (this.pagesize === 0) {
          this.pagesize = pageResult.results.length;
        }
      }), shareReplay(1)
    );

  }
}
