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
import { AdSearchService } from './ad-search.service';
import { Ad } from './ad.model';
@Component({
  moduleId: module.id,
  selector: 'ad-search',
  templateUrl: './ad-search.component.html',
  styleUrls: ['../app.component.css','./ad-search.component.css'],
  providers: [AdSearchService]
})
export class AdSearchComponent implements OnInit {
  ads: Observable<Ad[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private adSearchService: AdSearchService,
    private router: Router) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.ads = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.adSearchService.search(term)
        // or the observable of empty ads if there was no search term
        : Observable.of<Ad[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Ad[]>([]);
      });
  }
  gotoDetail(ad: Ad): void {
    let link = ['/ads', ad.id];
    this.router.navigate(link);
  }
}
