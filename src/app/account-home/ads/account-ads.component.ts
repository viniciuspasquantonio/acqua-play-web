import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { LoginService }    from '../../login/login.service';
import { User }    from '../../user/user.model';
import { Ad }    from '../../ad/ad.model';
import { AdService }    from '../../ad/ad.service';




@Component({
  moduleId: module.id,
  selector: 'account-ads-detail',
  styleUrls: ['../../app.component.css'],
  templateUrl: './account-ads.component.html'
})
export class AccountAdsComponent {
	user: User;
	ads:Ad[] = [];
  	imgs:string[] = [];
  	errorMessage: string = null;
  	isLoading: boolean = true;
	  constructor(
	    private adService: AdService,
	    private router: Router,
	    private loginService :LoginService) {}
	  
	  ngOnInit(): void {
	  	this.user = this.loginService.currentUser();
	    // this.adService.findBySeller(this.user.username).subscribe(
	    this.adService.findBySeller(this.user.id).subscribe(
	         /* happy path */ a => {
	                                    this.ads = a;
	                                    for (let ad of a) {
	                                        this.extractImageSrc(ad);
	                                    }
	                                   
	                                },
	         /* error path */ e => {
	           this.errorMessage = e;},
	         /* onComplete */ () => this.isLoading = false);
	  }

	  private extractImageSrc(ad:Ad)  {
	    if(!ad.images || ad.images.length == 0){
	      return;
	    }
	    this.adService.getImageSrc(ad,0).subscribe(
	         /* happy path */ imgUrl => {
	         								this.imgs[ad.id] = imgUrl},
	         /* error path */ e => {
	           this.errorMessage = e;},
	         /* onComplete */ () => this.isLoading = false);
	    
	  }

}
