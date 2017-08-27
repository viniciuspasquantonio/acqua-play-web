
import { Injectable } from '@angular/core';
import { Http , URLSearchParams , Response, Headers  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Login } from './login.model';
import { OauthTokenResponse } from '../oauth/oauth-token-response.model';
import { User} from '../user/user.model';


@Injectable()
export class LoginService {
  private oauthLoginEndPointUrl = 'http://localhost:8080/oauth/token';
  private authUser = 'my-trusted-client';
  private authPassword = 'secret';
  

  constructor(public http: Http) {}

  login(login:Login) : Observable<OauthTokenResponse> {
    let params: URLSearchParams = new URLSearchParams();
     params.set('username', login.email );
     params.set('password', login.password );
     params.set('grant_type', 'password' );

    return this.http.post(this.oauthLoginEndPointUrl , {},{
                   search: params,
                   headers: this.getHeaders()
                 }).map(this.handleData)
                   .catch(this.handleError);
  }

  private handleData(res: Response) {
    let body = res.json();
    console.log(body)
    return body;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public logout() {
     localStorage.removeItem('token');
     localStorage.removeItem('user');

     
  }

  private getHeaders(){
    let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'Basic ' + btoa(this.authUser + ':' + this.authPassword));
     
    return headers;
  }

   isLoggedIn() : Boolean{
    return (localStorage.getItem("token") === null) ? false : true;
  }

  currentUser() : User{
    return JSON.parse(localStorage.getItem("user"));
  }

  public updateLoggedUser(user:User) {
     localStorage.setItem('user', JSON.stringify(user));

     
  }
}


