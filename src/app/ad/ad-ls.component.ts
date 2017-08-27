import { Component, Input } from '@angular/core';
import { Ad } from './ad.model';


@Component({
  moduleId: module.id,
  selector: 'ad-ls',
  styleUrls: ['./ad-list.component.css'],
  templateUrl: './ad-ls.component.html'
  
})
export class AdLsComponent {
  

  @Input()
  ads: Ad[] = [];
  
  

  constructor(
    ) {}
  
  

}
