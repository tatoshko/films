import {Injectable} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Observable, of} from 'rxjs';
import {Film} from './types';
import {isNullOrUndefined} from 'util';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FilmService {

    private ls_key = 'film-list';
    private data: Film[];

    constructor(
        private ls: LocalStorage,
    ) {
    }

    public findById(id: string): Film | undefined {
        return this.data.find(f => f.imdbID === id);
    }

    public add(film: Film): Observable<boolean> {
        this.data.unshift(film);

        return this.save();
    }

    public deleteById(id: string): Observable<boolean> {
        const index = this.data.findIndex(f => f.imdbID === id);

        if (index !== -1) {
            this.data.splice(index, 1);
            return this.save();
        }

        return of(false);
    }

    public load(): Observable<Film[]> {
        if (isNullOrUndefined(this.data)) {
            return this.ls.getItem<Film[]>(this.ls_key).pipe(
                tap(data => this.data = data)
            );
        }

        return of(this.data);
    }

    public save(): Observable<boolean> {
        return this.ls.setItem(this.ls_key, this.data);
    }

}
