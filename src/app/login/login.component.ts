	import { Component,Input, OnInit,ViewChild } from '@angular/core';
	import { Login }    from './login.model';
	import { LoginService }    from './login.service';
	import { UserService }    from '../user/user.service';
	import { Router } from '@angular/router';
	import { User }    from '../user/user.model';
	import { AlertService } from '../alert/alert.service';
	@Component({
	  moduleId: module.id,
	  selector: 'login',
	  styleUrls: ['./login.component.css'],
	  templateUrl: './login.component.html'
	})
	export class LoginComponent { 
		constructor(
	    	private loginService:LoginService,
	    	private userService:UserService,
	      	private router: Router,
	      	private alertService:AlertService
	  	) {}

	  	@Input()
		loginInfo: Login;

		@Input()
		user: User;

		@Input()
		confirmPassword: String;

		@ViewChild('registerForm') registerForm;
		
		ngOnInit(): void {
	  	  	this.newLogin();
	  	  	this.newUser();
	  	}

		
		newLogin() {
	    	this.loginInfo = new Login();	    
		}
		
		login(loginInfo:Login): void {
					    this.loginService.login(loginInfo)
		                     .subscribe(
		                       response => {

			                        localStorage.setItem('token', response.access_token);
			                        this.userService.findByEmail(loginInfo.email).subscribe(
				                       response => {

				                        	this.loginService.updateLoggedUser(response);
				                        	this.router.navigateByUrl('/home');
			                        		window.location.reload();
				                       },
				                       error => {
				                        alert(error);
				                       }
				                     );
			                        
		                       },
		                       error => {
		                        alert(error);
		                       }
		                     );
		 }
	  
		newUser() {
    		this.user = new User();	    
		}
		save(): void {
			this.user.username = this.user.email;
			if(this.user.password != this.confirmPassword){
				this.alertService.warn("Confirmacao da senha deve ser igual a senha ");
				return;
			}
			this.userService.create(this.user);
			this.alertService.success("Cadastro realizado com sucesso!");
			this.registerForm.resetForm();
	  		
		}

	}
