import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }   from './app.component';
import { AdSearchComponent }   from './ad/ad-search.component';
import { AdDetailComponent }  from './ad/ad-detail.component';
const routes: Routes = [
  
  { path: '', redirectTo: '/ads', pathMatch: 'full' },
  { path: 'ads',  component: AdSearchComponent },
  { path: 'ads/new',  component: AdDetailComponent },
  { path: 'ads/:id', component: AdDetailComponent }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
