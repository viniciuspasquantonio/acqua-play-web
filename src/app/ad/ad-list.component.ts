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
@Component({
  moduleId: module.id,
  selector: 'ad-list',
  templateUrl: './ad-list.component.html',
  providers: [AdService]
})
export class AdListComponent implements OnInit {
  ads:Ad[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  constructor(
    private adService: AdService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.adService.getAll().subscribe(
         /* happy path */ a => this.ads = a,
         /* error path */ e => {
           this.errorMessage = e;},
         /* onComplete */ () => this.isLoading = false);
  }

}
