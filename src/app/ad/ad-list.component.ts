import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute }            from '@angular/router';
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

import { Category }    from '../category/category.model';
import { CategoryService }    from '../category/category.service';



@Component({
  moduleId: module.id,
  selector: 'ad-list',
  styleUrls: ['./ad-list.component.css'],
  templateUrl: './ad-list.component.html',
  providers: [AdService]
})
export class AdListComponent implements OnInit {
  
  ads:Ad[] = [];
  imgs:string[] = [];
  errorMessage: string = null;
  
  categories: Category[] = [];
  isList:boolean = false;

  @Input()
  selectedCategory: Category = null;
  
  @Input()
  searchText: string = null;

page:number = 0;
size:number = 20;
  constructor(
    private adService: AdService,
    private route: ActivatedRoute,
    private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
                          a => {this.categories = a;});
    
      this.route.params
      .switchMap(params => this.adService.search(params['search'],this.page,this.size))
      .subscribe(a => {
                        this.ads = a.content;
                        for (let ad of a.content) {
                            this.extractImageSrc(ad);
                        }
                                   
                      },
                    e => {
                        this.errorMessage = e;
                      }
                  );    
    
  }

  private extractImageSrc(ad:Ad)  {
    if(!ad.images || ad.images.length == 0){
      return;
    }
    this.adService.getImageSrc(ad,0).subscribe(
         /* happy path */ imgUrl => {this.imgs[ad.id] = imgUrl},
         /* error path */ e => {
           this.errorMessage = e;});
    
  }


}
