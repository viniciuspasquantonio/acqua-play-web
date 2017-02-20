import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdSearchComponent }   from './ad-search.component';
import { AdDetailComponent }  from './ad-detail.component';
const routes: Routes = [
  
  { path: 'ads',  component: AdSearchComponent },
  { path: 'ads/new',  component: AdDetailComponent },
  { path: 'ads/:id', component: AdDetailComponent }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AdRoutingModule {}