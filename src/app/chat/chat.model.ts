import {Message} from './message.model';
import {User} from '../user/user.model';
import {Ad} from '../ad/ad.model';

export class Chat {
	messages: Message[];
    
    chatKey:number;
    user1:User;
    user2:User;
    ad:Ad;
    adImage:string;

}