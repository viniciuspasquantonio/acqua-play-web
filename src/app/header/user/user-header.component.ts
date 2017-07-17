import { Component } from '@angular/core';
import { LoginService }    from '../../login/login.service';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html'
})
export class UserHeaderComponent {
  constructor(private loginService :LoginService){}
  logout(){
  	this.loginService.logout();
  	 window.location.reload();
  }
}