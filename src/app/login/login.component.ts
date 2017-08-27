	import { Component,Input, OnInit } from '@angular/core';
	import { Login }    from './login.model';
	import { LoginService }    from './login.service';
	import { UserService }    from '../user/user.service';
	import { Router } from '@angular/router';
	import { User }    from '../user/user.model';

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
	      	private router: Router
	  	) {}

	  	@Input()
		loginInfo: Login;

		@Input()
		user: User;

		@Input()
		confirmPassword: String;
		
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
			if(this.user.password != this.confirmPassword){
				alert("Confirmacao da senha deve ser igual a senha ");
				return;
			}
			this.userService.create(this.user);
			
	  		
		}

	}
