import { Component,Input, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { Headers,URLSearchParams} from '@angular/http';
import { LoginService }    from '../login/login.service';


import { Ad }    from './ad.model';
import { AdService }    from './ad.service';

import { Category }    from '../category/category.model';
import { CategoryService }    from '../category/category.service';

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
      	private router: Router,
        private loginService: LoginService,
        private categoryService: CategoryService
    	//private route: ActivatedRoute,
    	//private location: Location
  	) {}
  	
  	

	@Input()
	ad: Ad;

  @Input()
  selectedCategory: Category;

  categories: Category[] = [];
	
	@Input()
  	uploadUrl: string;

  	


	ngOnInit(): void {
    	this.newAd();
    	this.uploadUrl = 'http://localhost:8080/upload/?access_token='+localStorage.getItem("token");
    	this.categoryService.getAll().subscribe(
                          a => {this.categories = a;});
    	
  	}

	
	newAd() {
    	this.ad = new Ad();
    	this.ad.images = [];	    
	}
	save(): void {
    this.ad.sellerId = this.loginService.currentUser().id;
    console.log('selectedCategory');
    this.ad.categoryId = this.selectedCategory.id;
		if(this.ad.id){
			this.adService.update(this.ad);
		}else{
			this.adService.create(this.ad).subscribe(
         /* happy path */ a => {this.router.navigateByUrl('/ad-created');},
         /* error path */ e => {
           alert(e);});
		}

    
  		
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
