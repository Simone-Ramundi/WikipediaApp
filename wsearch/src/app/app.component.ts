import { Component } from '@angular/core';
import {WikipediaService} from "./wikipedia.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages : any[]=[];
  constructor(private wikipedia: WikipediaService) {}
  onTerm(term:string){
      // console.log(`I am the app and here is the term`, term)
      // const results = this.wikipedia.search(term);
      // console.log(results);
    /* WE PASS 'PAGES' INSTEAD OF RESPONSE */
    this.wikipedia.search(term).subscribe((pages)=> {
      // console.log(response);
      this.pages = pages;
    });
  }
}
