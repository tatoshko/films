import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film, SearchResult} from './types';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OmdbService {

    constructor(
        private http: HttpClient,
    ) {}

    public get api(): string {
        return 'http://www.omdbapi.com/?apikey=' + environment.omdbKey;
    }

    public getById(id: string): Observable<Film> {
        const q = [
            this.api,
            'i=' + id
        ].join('&');

        return this.http.get<Film>(q);
    }

    public search(query: string, page: number = 1): Observable<SearchResult> {
        const q = [
            this.api,
            's=' + query,
            'page=' + page
        ].join('&');

        return this.http.get<SearchResult>(q);
    }

}
