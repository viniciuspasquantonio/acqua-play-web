import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';





import { Ad }    from '../ad/ad.model';
import { AdService }    from '../ad/ad.service';

import { User }    from '../user/user.model';
import { UserService }    from '../user/user.service';
import { LoginService }    from '../login/login.service';

import 'rxjs/add/operator/switchMap';

import { Chat }    from './chat.model';
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
  chat: Chat;

  chats: Chat[] = [];

	ngOnInit(): void {
      this.currentUser = this.loginService.currentUser();
      this.chat = new Chat();

      this.route.params
      // (+) converts string 'id' to a number
      .switchMap(params => this.adService.get(+params['id']))
      .subscribe(a => {
                        this.ad = a;
                        this.extractImageSrc(a);
                        this.userService.findByUsername(a.seller).subscribe(user => {this.seller = user;this.chat.sellerId = this.seller.id;});
                        this.chat.adId = a.id;

                        this.chatService.findUserAdChat(a.id,this.currentUser.id).subscribe(
                          chats => {this.chats = chats;},
                          e => {this.errorMessage = e;}
                        );
                      });

      



      
  }

  send(): void {
    this.chat.userId = this.currentUser.id;
    this.chat.username = this.currentUser.username;
    this.chatService.save(this.chat).subscribe(
         /* happy path */ a => {this.chats.push(a)},
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

  
	
	
  


}

