import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Ad } from './ad.model';

@Injectable()
export class AdService {
	private adsUrl = 'http://localhost:8080/ads';  // URL to web api  
  private baseUrl: string = 'http://localhost:8080/';
	constructor(private http: Http) { }

   getAll(): Observable<Ad[]>{
    let ad$ = this.http
      .get(`${this.baseUrl}/ads`, {headers: this.getHeaders()})
      .map(mapAds)
      .catch(handleErrors);
      console.log("ads$ ",ad$);
      return ad$;
  }

  get(id: number): Observable<Ad> {
    let ad$ = this.http
      .get(`${this.baseUrl}/ads/${id}`, {headers: this.getHeaders()})
      .map(mapAd)
      .catch(handleErrors);
      return ad$;      
  }

  create(ad: Ad): Promise<Ad> {
     return this.http
      .post(this.adsUrl, JSON.stringify(ad), {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);     
  }

  update(ad: Ad): Promise<Ad> {    
    return this.http
      .put(this.adsUrl, JSON.stringify(ad), {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError); 
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
   private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    
    return headers;
  }

 }
 function mapAds(response:Response): Ad[]{
   // The response of the API has a results
   // property with the actual results  
   return response.json()._embedded.ads;
  }

function toAd(r:any): Ad{
  let ad = <Ad>({
    title: r.title,
    description: r.description,
    price: r.value
  });
  console.log('Parsed ad:', ad);
  return ad;

}
function mapAd(response:Response): Ad{
  // toPerson looks just like in the previous example
  return toAd(response.json());
}

// this could also be a private method of the component class
function handleErrors (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
