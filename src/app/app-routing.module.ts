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

const routes: Routes = [
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'ads',  component: AdListComponent },
  { path: 'ads/new',  component: AdDetailComponent, canActivate: [
    
    CanActivateViaOAuthGuard
  ] },
  { path: 'ads/info/:id', component: AdInfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
