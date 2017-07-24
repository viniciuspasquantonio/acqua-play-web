import { Component,Input, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { Headers,URLSearchParams} from '@angular/http';


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
  	
  	private authUser = 'my-trusted-client';
  
  	private authPassword = 'secret';

	@Input()
	ad: Ad;
	
	@Input()
  	uploadUrl: string;

  	


	ngOnInit(): void {
    	this.newAd();
    	this.uploadUrl = 'http://localhost:8080/upload/?access_token='+localStorage.getItem("token");
    	
    	
  	}

	
	newAd() {
    	this.ad = new Ad();
    	this.ad.images = [];	    
	}
	save(): void {
		if(this.ad.id){
			this.adService.update(this.ad);
		}else{
			this.adService.create(this.ad);
		}

    this.router.navigate(['home']);
  		
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

  imageUploaded($event): void {
			console.log('event', $event);
  		this.ad.images.push($event.file.name);
	}

  


}
