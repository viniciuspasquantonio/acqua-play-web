import { Component,Input, OnInit } from '@angular/core';

//import { ActivatedRoute, Params }   from '@angular/router';
//import { Location }                 from '@angular/common';

import { Product }    from './product.model';
import { ProductService }    from './product.service';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent { 
	constructor(
    	private productService: ProductService,
    	//private route: ActivatedRoute,
    	//private location: Location
  	) {}
	@Input()
	product: Product;
	
	ngOnInit(): void {
    	this.newProduct();
  	}

	
	newProduct() {
	    this.product = new Product(undefined, '', '',0);
	}
  	save(): void {
  		if(this.product.id){
  			this.productService.update(this.product);
  		}else{
  			this.productService.create(this.product);
  		}
  		
	}


}
