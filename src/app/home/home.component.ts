import {Component, OnInit} from '@angular/core';

// Observable class extensions
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import {SearchResult} from '../search-result';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchResults: Observable<SearchResult[]>;
  searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.searchResults = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.searchService.getSearchResults(term)
        // or the observable of empty search results if there was no search term
        : Observable.of<SearchResult[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<SearchResult[]>([]);
      });
  }

  search(query: string) {
    this.searchTerms.next(query);
  }

}
