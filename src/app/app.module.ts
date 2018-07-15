import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FilmsComponent} from './films/films.component';
import {SearchComponent} from './films/search.component';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule, MatProgressBarModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        FilmsComponent,
        SearchComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        MatProgressBarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
