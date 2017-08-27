import { Injectable } from '@angular/core';
import { Http, Response, Headers,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Category } from './category.model';
import {HttpService} from '../oauth/auth-http.service';

@Injectable()
export class CategoryService {
	private categoryUrl = 'http://localhost:8080/category/';
  
  
	constructor(private http: Http,private authHttp: HttpService) { }

   getAll(): Observable<Category[]>{
    return this.authHttp
      .get(this.categoryUrl, {headers: this.getHeaders()})
      .map(mapCategories)
      .catch(handleErrors);      
      
  }

   private getHeaders(){
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    
    return headers;
  }
  

 }
 function mapCategories(response:Response): Category[]{
    
   return response.json();
  }

function toCategory(r:any): Category{
  let category = <Category>({
    id: r.id,
    name: r.name,
    image: r.image
  });
  return category;

}
function mapCategory(response:Response): Category{
  return toCategory(response.json());
}

function handleErrors (error: any) {
  
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`

  
  return Observable.throw(errorMsg);
}




