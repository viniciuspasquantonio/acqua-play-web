import { Injectable } from '@angular/core';
import { Http, Response, Headers,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from './user.model';
import {HttpService} from '../oauth/auth-http.service';

@Injectable()
export class UserService {
	private userUrl = 'http://localhost:8080/user/';  // URL to web api  
  	private baseUrl: string = 'http://localhost:8080/';
  	private authUser = 'my-trusted-client';
  private authPassword = 'secret';
	constructor(private http: Http,private authHttp: HttpService) { }

   

  get(id: number): Observable<User> {
    return this.http
      .get(`${this.baseUrl}/user/${id}`, {headers: this.getHeaders()})
      .map(mapUser)
      .catch(handleErrors);
      
  }
 findByUsername(username: string): Observable<User> {
    return this.http
      .get(`${this.baseUrl}/user/findByUsername/${username}`, {search:this.getSearchParams(),headers: this.getHeaders()})
      .map(mapUser)
      .catch(handleErrors);
      
  }
  create(user: User): Promise<User> {
       return this.http
      .post(this.userUrl, JSON.stringify(user), {search:this.getSearchParams(),headers: this.getHeaders()})

      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);     
  }


  update(user: User): Observable<User> {
      
     return this.authHttp
      .put(this.userUrl, JSON.stringify(user), {headers: this.getHeaders()})
      .map(mapUser)
      .catch(this.handleError);    
  }

  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
   private getHeaders(){
	    let headers = new Headers();
	    
	    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa(this.authUser + ':' + this.authPassword));
	    
	    
	    return headers;
  }

   private getSearchParams(){
      let params: URLSearchParams = new URLSearchParams();
     params.set('access_token', localStorage.getItem("token")   );
     return params;
  }
  
  

 }
 

function toUser(r:any): User{
  let user = <User>({
  	
    id: r.id,
    email: r.email,
    password: r.password,
    firstName: r.firstName,
    lastName: r.lastName,
    phone: r.phone,
    tower: r.tower,
    apartment: r.apartment,
    username: r.username
  });
  console.log('Parsed user:', user);
  return user;

}
function mapUser(response:Response): User{
  return toUser(response.json());
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


