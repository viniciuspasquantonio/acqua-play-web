import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }   from './app.component';
import { AdListComponent }   from './ad/ad-list.component';
import { AdDetailComponent }  from './ad/ad-detail.component';
import { HomeComponent }  from './home/home.component';
const routes: Routes = [
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'ads',  component: AdListComponent },
  { path: 'ads/new',  component: AdDetailComponent },
  { path: 'ads/:id', component: AdDetailComponent }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
