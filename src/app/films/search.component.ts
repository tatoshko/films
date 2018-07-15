import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Film, SearchResult} from '../types';
import {FormControl} from '@angular/forms';
import {OmdbService} from '../omdb.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    public searchCtrl = new FormControl;
    public results: SearchResult;

    public currentPage = 1;
    public totalPages: number;
    public perPage = 10;

    public search = false;

    @Output()
    public select: EventEmitter<Film> = new EventEmitter<Film>();

    constructor(
        private omdbService: OmdbService,
    ) {
        this.searchCtrl.valueChanges
            .pipe(
                switchMap(v => {
                    this.search = true;
                    return this.omdbService.search(v);
                })
            )
            .subscribe(
                sr => {
                    this.results = sr;
                    this.totalPages = Math.ceil(sr.totalResults / this.perPage);
                    this.search = false;
                },
                err => console.error(err),
            );
    }

    ngOnInit() {
    }

    public onPrevPage(): void {
        if (this.currentPage > 1) {
            this.search = true;

            --this.currentPage;

            this.omdbService
                .search(this.searchCtrl.value, this.currentPage)
                .subscribe(sr => {
                    this.results = sr;
                    this.search = false;
                });
        } else {
            this.currentPage = 1;
        }
    }

    public onNextPage(): void {
        if (this.currentPage < this.results.totalResults) {
            ++this.currentPage;

            this.omdbService
                .search(this.searchCtrl.value, this.currentPage)
                .subscribe(sr => {
                    this.results = sr;
                    this.search = false;
                });
        } else {
            this.currentPage = this.results.totalResults;
        }
    }

    public onSelect(film: Film): void {
        this.select.emit(film);
    }

}
