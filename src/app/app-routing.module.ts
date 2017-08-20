import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }   from './app.component';
import { AdListComponent }   from './ad/ad-list.component';
import { AdDetailComponent }  from './ad/ad-detail.component';
import { HomeComponent }  from './home/home.component';
import { AdInfoComponent }  from './ad/ad-info.component';
import { LoginComponent }  from './login/login.component';
import { RegisterComponent }  from './register/register.component';
import { CanActivateViaOAuthGuard } from './oauth/can-activate-guard';
import { AdCreatedComponent }  from './ad/ad-created.component';
import {AccountHomeComponent} from './account-home/account-home.component';
import {AccountDetailComponent} from './account-home/detail/account-detail.component';
import {AccountAdsComponent} from './account-home/ads/account-ads.component';
import {AccountPendingAdsComponent} from './account-home/pending-ads/account-pending-ads.component';
import { AdEditComponent }  from './ad/ad-edit.component';
import { AdChatComponent }  from './chat/ad-chat.component';


const routes: Routes = [
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'ads',  component: AdListComponent, canActivate: [
    
    CanActivateViaOAuthGuard
  ]   },
  { path: 'ads/new',  component: AdDetailComponent, canActivate: [
    
    CanActivateViaOAuthGuard
  ] },
  { path: 'ads/info/:id', component: AdInfoComponent, canActivate: [
    
    CanActivateViaOAuthGuard
  ]  },
  { path: 'ads/chat/:id', component: AdChatComponent, canActivate: [
    
    CanActivateViaOAuthGuard
  ]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ad-created', component: AdCreatedComponent },
  { path: 'account-home', component: AccountHomeComponent, children: [
    { path:'',component: AccountDetailComponent, outlet: 'account'},
    { path: 'detail', component: AccountDetailComponent, outlet: 'account' },
    { path: 'myads', component: AccountAdsComponent, outlet: 'account' },
    { path: 'pending-ads', component: AccountPendingAdsComponent, outlet: 'account' },
    { path: 'edit/:id', component: AdEditComponent, outlet: 'account' }] }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
