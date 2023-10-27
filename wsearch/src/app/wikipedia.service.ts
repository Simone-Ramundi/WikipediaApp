import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

/* 1. We import the observable */
import {Observable} from "rxjs";
/* 5. Import the pluck operator */
import { pluck } from "rxjs/operators";

/* 4. Create a new interface */
interface Car {
  year: number;
  color: string;
  running: boolean;
  make: {
    companyName: string;
    dateCreated: number;
  }

}

/* 2. Create an observable */
const observable = new Observable<Car>((observer) => {
  observer.next({
    year: 2000,
    color: 'red',
    running: true,
    make: {
      companyName: 'Lamborghini',
      dateCreated: 1950
    }
  });
});

/* 3 Make sure subscribe it */
observable.subscribe(value => {
  console.log(value);
/* 6. Put the pipe with pluck operator */
}).pipe(
  pluck('make', 'name')
);



@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private http: HttpClient) {
  }
  search(term: string){
    // return 'I am wiki search results';
    return this.http.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    });
  }
}

