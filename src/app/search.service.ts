import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {SearchResult} from './search-result';

@Injectable()
export class SearchService {
  private searchUrl = 'http://localhost:8000/api/search'; // URL to web API

  private static extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private static handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http) {
  }

  getSearchResults(query: string): Observable<SearchResult[]> {
    return this.http.get(this.searchUrl + '?q=' + query)
      .map(SearchService.extractData)
      .catch(SearchService.handleError);
  }
}
