import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Ad }           from './ad.model';
@Injectable()
export class AdSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Ad[]> {
    return this.http
               .get(`app/ads/?name=${term}`)
               .map(response => response.json().data as Ad[]);
  }
}
