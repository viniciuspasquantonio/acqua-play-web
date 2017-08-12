	import { Component,Input, OnInit } from '@angular/core';
	import { Login }    from './login.model';
	import { LoginService }    from './login.service';
	import { UserService }    from '../user/user.service';
	import { Router } from '@angular/router';


	@Component({
	  moduleId: module.id,
	  selector: 'login',
	  styleUrls: ['../app.component.css'],
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
		
		ngOnInit(): void {
	  	  	this.newLogin();
	  	}

		
		newLogin() {
	    	this.loginInfo = new Login();	    
		}
		
		login(loginInfo:Login): void {
			
		    this.loginService.login(loginInfo)
		                     .subscribe(
		                       response => {
			                        localStorage.setItem('token', response.access_token);
			                        this.userService.findByUsername(loginInfo.username).subscribe(
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
	  


	}
