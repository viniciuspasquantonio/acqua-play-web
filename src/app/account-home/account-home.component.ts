import { Component,Input } from '@angular/core';
import { LoginService }    from '../login/login.service';
import { User }    from '../user/user.model';

@Component({
  moduleId: module.id,
  selector: 'account-home',
  styleUrls: ['../app.component.css'],
  templateUrl: './account-home.component.html'
})
export class AccountHomeComponent {
	@Input()
	user: User;
	constructor(private loginService :LoginService){}
	ngOnInit(): void {
	    this.user = this.loginService.currentUser();
	}

}
