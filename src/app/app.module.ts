import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { ProductFormComponent } from './product/product-form.component';
import { AdDetailComponent } from './ad/ad-detail.component';
import { HomeComponent } from './home/home.component';
import { ProductService } from './product/product.service';
import { AdService } from './ad/ad.service';

import {AdListComponent} from './ad/ad-list.component';
import {AdRoutingModule} from './ad/ad-routing.module';
import {AdInfoComponent} from './ad/ad-info.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    AdDetailComponent,
    AdListComponent,
    HomeComponent,
    AdInfoComponent,
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
                AdService
                                
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
