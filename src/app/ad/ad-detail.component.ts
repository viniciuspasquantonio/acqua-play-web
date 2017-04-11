import { Component,Input, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
//import { ActivatedRoute }   from '@angular/router';
//import { Location }                 from '@angular/common';

import { Ad }    from './ad.model';
import { AdService }    from './ad.service';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'ad-detail',
  styleUrls: ['../app.component.css'],
  templateUrl: './ad-detail.component.html'
})
export class AdDetailComponent { 
	constructor(
    	private adService: AdService,
      private router: Router
    	//private route: ActivatedRoute,
    	//private location: Location
  	) {}
	@Input()
	ad: Ad;
	
	ngOnInit(): void {
    	this.newAd();
  }

	
	newAd() {
    	this.ad = new Ad();	    
	}
	save(): void {
		if(this.ad.id){
			this.adService.update(this.ad);
		}else{
			this.adService.create(this.ad);
		}

    this.router.navigate(['home']);
  		
	}
  


}
