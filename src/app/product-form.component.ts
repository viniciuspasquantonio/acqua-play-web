import { Component } from '@angular/core';

import { Product }    from './product.model';

@Component({
  moduleId: module.id,
  selector: 'product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent { 

  submitted = false;
  model = new Product(0, '', '',0);

  onSubmit() { this.submitted = true; }
  newProduct() {
      this.model = new Product(0, '', '',0);
  }

}
