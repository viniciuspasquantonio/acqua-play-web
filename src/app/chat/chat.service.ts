import { Injectable } from '@angular/core';
import { Http, Response, Headers,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Chat } from './chat.model';
import {HttpService} from '../oauth/auth-http.service';

@Injectable()
export class ChatService {
	private chatUrl = 'http://localhost:8080/chat/';  
  private baseUrl: string = 'http://localhost:8080/';
    
	constructor(private http: Http,private authHttp: HttpService) { }

   

  findBySeller(sellerId:string): Observable<Chat[]>{
    let params: URLSearchParams = new URLSearchParams();
     params.set('sellerId', sellerId);
    return this.authHttp
      .get(`${this.chatUrl}findBySeller`, {search:params,headers: this.getHeaders()})
      .map(mapChats)
      .catch(handleErrors);      
      
  }

  findUserAdChat(adId:number,userId:number): Observable<Chat[]>{
    let params: URLSearchParams = new URLSearchParams();
     params.set('adId', String(adId));
     params.set('userId', String(userId));
    return this.authHttp
      .get(`${this.chatUrl}findUserAdChat/`, {search:params,headers: this.getHeaders()})
      .map(mapChats)
      .catch(handleErrors);      
      
  }

  
   

  save(chat: Chat): Observable<Chat> {

     return this.authHttp
      .post(this.chatUrl, JSON.stringify(chat), {headers: this.getHeaders()})
      .map(mapChat)
      .catch(handleErrors);      
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
 
 function mapChats(response:Response): Chat[]{
   return response.json();
  }

function toChat(r:any): Chat{
  let chat = <Chat>({
    id: r.id,
    userId: r.userId,
    sellerId: r.sellerId,
    adId: r.adId,
    message: r.message,
    instant: r.instant,
    isSellerMessage:r.isSellerMessage
  });
  return chat;

}
function mapChat(response:Response): Chat{
  return toChat(response.json());
}

function handleErrors (error: any) {
 
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`


  return Observable.throw(errorMsg);
}




