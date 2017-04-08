import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdListComponent }   from './ad-list.component';
import { AdDetailComponent }  from './ad-detail.component';
const routes: Routes = [
  
  { path: 'ads',  component: AdListComponent },
  { path: 'ads/new',  component: AdDetailComponent },
  { path: 'ads/:id', component: AdDetailComponent }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AdRoutingModule {}