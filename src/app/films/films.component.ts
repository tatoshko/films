import {Component, OnInit} from '@angular/core';
import {FilmService} from '../film.service';
import {OmdbService} from '../omdb.service';
import {Film} from '../types';
import {first, map, startWith, switchMap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-films',
    templateUrl: './films.component.html',
    styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

    public films: Film[];
    public filtered: Observable<Film[]>;
    public searchCtrl = new FormControl;

    constructor(
        private filmService: FilmService,
        private omdbService: OmdbService,
    ) {
        this.filtered = this.searchCtrl.valueChanges.pipe(
            startWith(''),
            map((v: string) => {
                if (!v) {
                    return this.films;
                }

                return this.films.filter(f => f.Title.toLowerCase().indexOf(v.toLowerCase()) !== -1);
            })
        );
    }

    ngOnInit() {
        this.filmService.load().pipe(first()).subscribe(films => this.films = films);
    }

    public onDeleteFromLibrary(film: Film): void {
        this.filmService.deleteById(film.imdbID).subscribe();
    }

    public onAddToLibrary(film: Film): void {
        const idx = this.films.findIndex(f => f.imdbID === film.imdbID);

        if (idx !== -1) {
            return alert('Already exists');
        }

        this.omdbService.getById(film.imdbID).pipe(
            switchMap(f => this.filmService.add(f))
        ).subscribe();
    }

}
