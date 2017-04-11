import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';



import { Ad }    from './ad.model';
import { AdService }    from './ad.service';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'ad-info',  
  templateUrl: './ad-info.component.html'
})
export class AdInfoComponent { 
	ad:Ad = new Ad();
  constructor(
    	private adService: AdService,      
      private route: ActivatedRoute
    	
  	) {}
	
	
	ngOnInit(): void {
      this.route.params
      // (+) converts string 'id' to a number
      .switchMap(params => this.adService.get(+params['id']))
      .subscribe(a => this.ad = a);
      
  }
	
	
  


}

