import { Component,Input } from '@angular/core';
import { LoginService }    from '../../login/login.service';
import { User }    from '../../user/user.model';
import { UserService }    from '../../user/user.service';


@Component({
  moduleId: module.id,
  selector: 'account-detail',
  styleUrls: ['../../app.component.css'],
  templateUrl: './account-detail.component.html'
})
export class AccountDetailComponent {
	@Input()
	user: User;
	constructor(private loginService :LoginService,
		private userService :UserService){}
	ngOnInit(): void {
	    this.user = this.loginService.currentUser();
	}

	update(): void {
    	console.log('user ',this.user);
		this.userService
				.update(this.user)
					.subscribe(
      					a => {
      						alert("Cadastro Atualizado com sucesso!");
      						this.loginService.updateLoggedUser(this.user);
      					},
      					e => {
       						console.log(e);
       					}
       				);
		
	}

}
