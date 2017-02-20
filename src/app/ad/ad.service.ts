import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ad } from './ad.model';

@Injectable()
export class AdService {
	private adsUrl = 'http://localhost:8080/ads';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
	constructor(private http: Http) { }

  getAds(): Promise<Ad[]> {
    return this.http.get(this.adsUrl)
               .toPromise()
               .then(response => response.json().data as Ad[])
               .catch(this.handleError);
  }
  getAd(id: number): Promise<Ad> {
    const url = `${this.adsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Ad)
      .catch(this.handleError);
  }

  create(ad: Ad): Promise<Ad> {
    return this.http
      .post(this.adsUrl, JSON.stringify(ad), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(ad: Ad): Promise<Ad> {
    const url = `${this.adsUrl}/${ad.id}`;
    return this.http
      .put(url, JSON.stringify(ad), {headers: this.headers})
      .toPromise()
      .then(() => ad)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  
}
