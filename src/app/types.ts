export class Film {
    public imdbID: string;

    public Title: string;
    public Year: number;
    public Rated: string;
    public Released: string;
    public Runtime: string;
    public Genre: string;
    public Director: string;
    public Writer: string;
    public Actors: string;
    public Plot: string;
    public Language: string;
    public Country: string;
    public Awards: string;
    public Poster: string;
    public Metascore: string;
    public imdbRating: string;
    public imdbVotes: string;
    public Type: string;
    public DVD: string;
    public BoxOffice: string;
    public Production: string;
    public Website: string;
    public Ratings: Rating[];
}

export class Rating {
    public Source: string;
    public Value: string;
}

export class SearchResult {
    public Search: Film[];
    public totalResults: number;
}
