import { Injectable } from '@angular/core';
import { Http, Response, Headers,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Ad } from './ad.model';
import {HttpService} from '../oauth/auth-http.service';

@Injectable()
export class AdService {
	private adsUrl = 'http://localhost:8080/ads/';  // URL to web api  
  private baseUrl: string = 'http://localhost:8080/';
  private imgSrc = 'http://localhost:8080/upload/files/';  
	constructor(private http: Http,private authHttp: HttpService) { }

   getAll(): Observable<Ad[]>{
    return this.authHttp
      .get(this.adsUrl, {headers: this.getHeaders()})
      .map(mapAds)
      .catch(handleErrors);      
      
  }

  
   getImageSrc(ad:Ad): Observable<any> {
      console.log('ad to img ',ad);
      return this.authHttp.get(this.imgSrc+ ad.images[0], {headers: this.getHeaders()})
              .map(this.extractUrl)
              .catch(handleErrors);  
             
     
  }

   extractUrl(res:Response):string {
    return res.url;
  }

  get(id: number): Observable<Ad> {
    return this.http
      .get(`${this.baseUrl}/ads/${id}`, {headers: this.getHeaders()})
      .map(mapAd)
      .catch(handleErrors);
      
  }

  create(ad: Ad): Promise<Ad> {

     return this.http
      .post(this.adsUrl, JSON.stringify(ad), {search:this.getSearchParams(),headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);     
  }

  update(ad: Ad): Promise<Ad> {    
    return this.http
      .put(this.adsUrl, JSON.stringify(ad), {search:this.getSearchParams(),headers: this.getHeaders()})
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
    
    headers.append('Content-Type', 'application/json');
    
    return headers;
  }
  private getSearchParams(){
      let params: URLSearchParams = new URLSearchParams();
     params.set('access_token', localStorage.getItem("token")   );
     return params;
  }
  

 }
 function mapAds(response:Response): Ad[]{
   // The response of the API has a results
   // property with the actual results  
   return response.json();
  }

function toAd(r:any): Ad{
  let ad = <Ad>({
    id: r.id,
    title: r.title,
    description: r.description,
    price: r.price
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




