import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

/* 1. Import the pluck operator */
import { pluck } from "rxjs/operators";

/* 3. Create a new interface WikipediaResponse */

interface WikipediaResponse {
  query: {
    search: {
      title: string;
      snippet: string;
      pageid: number;
    }[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private http: HttpClient) {
  }
  search(term: string){
    // return 'I am wiki search results';

    /* 4. '<>' WE PUT THE INTERFACE WE NEED IN ORDER TO UNDERSTAND */
    return this.http.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
      /* 2. Put the pipe and pluck operator */
    }).pipe(
      pluck('query','search')
    )
  }
}
