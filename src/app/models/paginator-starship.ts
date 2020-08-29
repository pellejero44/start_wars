import { Starship } from './starship';

export interface PaginatorStarship {
    count: number;
    next: string;
    previous: string;
    results: Array<Starship>;
}