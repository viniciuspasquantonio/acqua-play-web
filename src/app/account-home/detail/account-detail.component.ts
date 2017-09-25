import { Component,Input } from '@angular/core';
import { LoginService }    from '../../login/login.service';
import { User }    from '../../user/user.model';
import { UserService }    from '../../user/user.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  moduleId: module.id,
  selector: 'account-detail',
  
  templateUrl: './account-detail.component.html'
})
export class AccountDetailComponent {
	@Input()
	user: User;
	constructor(private loginService :LoginService,
		private userService :UserService,
		private alertService:AlertService){}
	ngOnInit(): void {
	    this.user = this.loginService.currentUser();
	}

	update(): void {
    	
		this.userService
				.update(this.user)
					.subscribe(
      					a => {
      						this.alertService.success("Cadastro atualizado com sucesso!");
      						this.loginService.updateLoggedUser(this.user);
      					},
      					e => {
       						console.log(e);
       					}
       				);
		
	}

}
