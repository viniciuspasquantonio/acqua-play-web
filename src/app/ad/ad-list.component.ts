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
import { AdService } from './ad.service';
import { Ad } from './ad.model';
import {HttpService} from '../oauth/auth-http.service';


@Component({
  moduleId: module.id,
  selector: 'ad-list',
  templateUrl: './ad-list.component.html',
  providers: [AdService]
})
export class AdListComponent implements OnInit {
  
  ads:Ad[] = [];
  imgs:string[] = [];
  errorMessage: string = null;
  isLoading: boolean = true;
  constructor(
    private adService: AdService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.adService.getAll().subscribe(
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
         /* happy path */ imgUrl => {this.imgs[ad.id] = imgUrl},
         /* error path */ e => {
           this.errorMessage = e;},
         /* onComplete */ () => this.isLoading = false);
    
  }


}
