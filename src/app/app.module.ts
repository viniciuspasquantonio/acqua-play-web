import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ImageUploadModule } from 'angular2-image-upload';


import { AppComponent } from './app.component';
import { ProductFormComponent } from './product/product-form.component';
import { AdDetailComponent } from './ad/ad-detail.component';
import { HomeComponent } from './home/home.component';
import { ProductService } from './product/product.service';
import { AdService } from './ad/ad.service';
import {LoginService} from './login/login.service';
import { CanActivateViaOAuthGuard } from './oauth/can-activate-guard';
import { HeaderComponent } from './header/header.component';
import { UserHeaderComponent } from './header/user/user-header.component';
import { DefaultHeaderComponent } from './header/default/default-header.component';
import {UserService} from './user/user.service';
import {HttpService} from './oauth/auth-http.service';


import {AdListComponent} from './ad/ad-list.component';
import {AdRoutingModule} from './ad/ad-routing.module';
import {AdInfoComponent} from './ad/ad-info.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdCreatedComponent} from './ad/ad-created.component';






@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    AdDetailComponent,
    AdListComponent,
    HomeComponent,
    AdInfoComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    UserHeaderComponent,
    DefaultHeaderComponent,
    AdCreatedComponent
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    ImageUploadModule.forRoot()
     
  ],
  providers: [
                ProductService,
                AdService,
                CanActivateViaOAuthGuard,
                LoginService,
                UserService,
                HttpService
                                
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
