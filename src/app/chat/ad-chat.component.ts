import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';





import { Ad }    from '../ad/ad.model';
import { AdService }    from '../ad/ad.service';

import { User }    from '../user/user.model';
import { UserService }    from '../user/user.service';
import { LoginService }    from '../login/login.service';

import 'rxjs/add/operator/switchMap';

import { Message }    from './message.model';
import { ChatService }    from './chat.service';

@Component({
  moduleId: module.id,
  selector: 'ad-chat', 
  styleUrls: ['../app.component.css'], 
  templateUrl: './ad-chat.component.html'
})
export class AdChatComponent { 
	ad:Ad = new Ad();
  imgUrl:string = null;
  errorMessage: string = null;
  seller:User = new User();
  currentUser:User = new User();
  constructor(
    private adService: AdService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private chatService: ChatService) {}
  
	@Input()
  message: Message;

  messages: Message[] = [];

	ngOnInit(): void {
      this.currentUser = this.loginService.currentUser();
      this.message = new Message();

      this.route.params
      // (+) converts string 'id' to a number
      .switchMap(params => this.adService.get(+params['id']))
      .subscribe(a => {
                        this.ad = a;
                        this.extractImageSrc(a);
                        this.userService.findByUserId(a.sellerId).subscribe(user => {this.seller = user;this.message.sellerId = this.seller.id;});
                        this.message.adId = a.id;

                        this.chatService.findUserAdChat(a.id,this.currentUser.id).subscribe(
                          messages => {this.messages = messages;},
                          e => {this.errorMessage = e;}
                        );
                      });

      



      
  }

  send(): void {
    this.message.userId = this.currentUser.id;
    this.chatService.save(this.message).subscribe(
         /* happy path */ a => {this.messages.push(a);this.message.text = '';},
         /* error path */ e => {
           alert(e);});
    
  }


  private extractImageSrc(ad:Ad)  {
    if(!ad.images || ad.images.length == 0){
      return;
    }
    this.adService.getImageSrc(ad,0).subscribe(
         /* happy path */ imgUrl => {this.imgUrl = imgUrl},
         /* error path */ e => {
           this.errorMessage = e;});
    
  }

  isLoggedUserMessage(message:Message):boolean{
    return (this.currentUser.id == message.userId);
  }

  
	
	
  


}

