import { Component } from '@angular/core';
import { Category }    from '../category/category.model';
import { CategoryService }    from '../category/category.service';
import { Router }   from '@angular/router';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html'
  
})
export class HomeComponent {
	categories: Category[] = [];
	constructor(
        private categoryService: CategoryService,
        private router: Router,

    
  	) {}

	ngOnInit(): void {
    	
    	this.categoryService.getAll().subscribe(
                          a => {this.categories = a;});
    	
  	}	

  	searchByCategory(category: Category): void{
  		this.router.navigate(['/ads-list/', category.name, category.id]);

  	}
}
