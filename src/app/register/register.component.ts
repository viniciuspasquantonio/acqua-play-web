import { Component,Input, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
//import { ActivatedRoute }   from '@angular/router';
//import { Location }                 from '@angular/common';

import { User }    from '../user/user.model';
import { UserService }    from '../user/user.service';

import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'register',
  styleUrls: ['../app.component.css'],
  templateUrl: './register.component.html'
})
export class RegisterComponent { 
	constructor(
    	private userService: UserService,
      	private router: Router
    	//private route: ActivatedRoute,
    	//private location: Location
  	) {}
	@Input()
	user: User;
	
	ngOnInit(): void {
    	this.newUser();
  }

	
	newUser() {
    	this.user = new User();	    
	}
	save(): void {
		
		this.userService.create(this.user);
		

    this.router.navigate(['login']);
  		
	}
  


}