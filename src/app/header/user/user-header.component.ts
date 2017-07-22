import { Component,Input } from '@angular/core';
import { LoginService }    from '../../login/login.service';
import { User }    from '../../user/user.model';

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

  @Input()
  user: User;

  ngOnInit(): void {
    	this.user = this.loginService.currentUser();
  }
}