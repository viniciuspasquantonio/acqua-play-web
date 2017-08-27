import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';





import { Ad }    from '../ad/ad.model';
import { AdService }    from '../ad/ad.service';

import { User }    from '../user/user.model';
import { UserService }    from '../user/user.service';
import { LoginService }    from '../login/login.service';

import 'rxjs/add/operator/switchMap';

import { Chat }    from './chat.model';
import { Message }    from './message.model';

import { ChatService }    from './chat.service';

@Component({
  moduleId: module.id,
  selector: 'chat', 
  styleUrls: ['./chat.component.css'], 
  templateUrl: './chat.component.html'
})
export class ChatComponent { 
	ad:Ad = new Ad();
  imgs:string[] = [];
  errorMessage: string = null;
  seller:User = new User();
  currentUser:User = new User();

  @Input()
  message: Message;

  constructor(
    private adService: AdService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private chatService: ChatService) {}
  
	@Input()
  chat: Chat;

  chats: Chat[] = [];

	ngOnInit(): void {
      this.currentUser = this.loginService.currentUser();
      this.chat = new Chat();
      this.message = new Message();
      this.chatService.listUserChats(this.currentUser.id).subscribe(
                          chats => {
                            this.chats = chats;
                            for (let chat of chats) {
                                  this.extractImageSrc(chat.ad);
                            }
                          },
                          e => {this.errorMessage = e;}
                        );

      



      
  }

  send(messages:Message[]): void {
    this.message.userId = messages[0].userId;
    this.message.sellerId = messages[0].sellerId;
    this.message.adId = messages[0].adId;
     
    this.message.userId = this.currentUser.id;
    this.chatService.save(this.message).subscribe(
         /* happy path */ a => {messages.push(a);this.message.text = '';},
         /* error path */ e => {
           alert(e);});
    
  }


  private extractImageSrc(ad:Ad)  {
    if(!ad.images || ad.images.length == 0){
      return;
    }
    this.adService.getImageSrc(ad,0).subscribe(
         /* happy path */ imgUrl => {this.imgs[ad.id] = imgUrl},
         /* error path */ e => {
           this.errorMessage = e;});
    
  }

  isLoggedUserMessage(message:Message):boolean{
    return (this.currentUser.id == message.userId);
  }

  

  
	
	
  


}

