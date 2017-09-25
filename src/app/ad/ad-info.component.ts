import { Component,Input, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';




import { Ad }    from './ad.model';
import { AdService }    from './ad.service';

import { User }    from '../user/user.model';
import { UserService }    from '../user/user.service';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'ad-info', 
  styleUrls: ['./ad-info.component.css'],
  templateUrl: './ad-info.component.html'
})
export class AdInfoComponent { 
	ad:Ad = new Ad();
  seller:User = new User();
  imgsUrl:string[] = [];
    

 selectedImg:number = 0;
  constructor(
    	private adService: AdService,      
      private route: ActivatedRoute,
       private userService: UserService


    	
  	) {}

}

