import { Component, Input } from '@angular/core'; 
import { Ad } from './ad.model';


@Component({
  moduleId: module.id,
  selector: 'ad-grid',
  styleUrls: ['./ad-list.component.css'],
  templateUrl: './ad-grid.component.html'
  
})
export class AdGridComponent {
  
  

  @Input()
  ads: Ad[] = [];
  

  constructor(
    ) {}
  
    


}
