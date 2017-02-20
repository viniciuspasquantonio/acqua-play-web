import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { ProductFormComponent } from './product/product-form.component';
import { AdDetailComponent } from './ad/ad-detail.component';
import { ProductService } from './product/product.service';
import { AdService } from './ad/ad.service';
import {AdSearchService} from './ad/ad-search.service';
import {AdSearchComponent} from './ad/ad-search.component';
import {AdRoutingModule} from './ad/ad-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    AdDetailComponent,
    AdSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
     
  ],
  providers: [
                ProductService,
                AdService,
                AdSearchService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
