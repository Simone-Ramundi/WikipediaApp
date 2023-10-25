import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor() { }
  search(term: string){
    return 'I am wiki search results';
  }
}

