import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';
import { Ad }           from './ad.model';
@Injectable()
export class AdListService {
  constructor(private http: Http) {}
  list(): Ad[]{
    return this.http
               .get(`app/ads/`)
               .map(response => response.json().data as Ad[]);
  }
}
