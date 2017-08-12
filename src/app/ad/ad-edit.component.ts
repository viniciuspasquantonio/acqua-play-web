import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers,URLSearchParams} from '@angular/http';
import { LoginService }    from '../login/login.service';


import { Ad }    from './ad.model';
import { AdService }    from './ad.service';

import { User }    from '../user/user.model';
import { UserService }    from '../user/user.service';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'ad-edit',
  styleUrls: ['../app.component.css'],
  templateUrl: './ad-edit.component.html'
})
export class AdEditComponent {

	constructor(
    	private adService: AdService,      
      private route: ActivatedRoute,
       private userService: UserService,
        private router: Router
    	//private route: ActivatedRoute,
    	//private location: Location
  	) {}
  	
  	
  
  seller:User = new User();
  imgsUrl:string[] = [];
  
	@Input()
	ad: Ad = new Ad();
	
	@Input()
  	uploadUrl: string;

  	


	ngOnInit(): void {
    	
    	this.uploadUrl = 'http://localhost:8080/upload/?access_token='+localStorage.getItem("token");
      this.route.params
      // (+) converts string 'id' to a number
      .switchMap(params => this.adService.get(+params['id']))
      .subscribe(a => { 
                        console.log('a',a);
                        this.ad = a;
                        this.userService.findByUsername(a.seller).subscribe(user => {this.seller = user});
                        for (var i = 0; i < a.images.length; i++) {
                          
                          this.adService.getImageSrc(a,i).subscribe(a => {
                              console.log('image ',a);
                            
                          
                          });
                        }
                        
                      });
    	
    	
  	}

	
	
	save(): void {
    
		
			this
        .adService
          .update(this.ad)
		        .subscribe(
              a => {
                      this.router.navigate(['/account-home', {outlets: {'account': ['myads']}}]);
              },
                e => {
                alert(e);
              }
            );
		

    
  		
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
