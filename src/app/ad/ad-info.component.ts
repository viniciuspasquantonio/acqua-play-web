import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';




import { Ad }    from './ad.model';
import { AdService }    from './ad.service';

import { User }    from '../user/user.model';
import { UserService }    from '../user/user.service';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'ad-info', 
  styleUrls: ['../../css/carousel.css','../../css/gallery.css','../../css/list-group.css','../../css/shop.css'], 
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
	
	
	ngOnInit(): void {
      
      this.route.params
      .switchMap(params => this.adService.get(params['id']))
      .subscribe(a => {
                        this.ad = a;
                        //this.userService.findByUserId(a.sellerId).subscribe(user => {this.seller = user});
                        a.images.forEach((img, index) => {
                            this.adService.getImageSrc(a,index).subscribe(imgSrc => {
                            
                              this.imgsUrl[index] = imgSrc;
                          
                            });
                        });
                                   
                      },
                    e => {
                        console.log(e);
                      }
                  );  

  }
}

