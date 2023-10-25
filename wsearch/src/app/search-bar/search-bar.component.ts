import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {WikipediaService} from "../wikipedia.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() submitted = new EventEmitter<string>();
  term = '';
  constructor() { }


  ngOnInit(): void {
  }

  /* FIRST METHOD
  onInput(value:string){
    this.term = value
  }
  */
  onFormSubmit(event:any){
    // It avoids submission if enter has not been pressed yet.
    event.preventDefault()
    // Pass communication to Parents
    this.submitted.emit(this.term);
  }
}
