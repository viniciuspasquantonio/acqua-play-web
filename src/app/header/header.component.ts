import { Component,Input, OnInit } from '@angular/core';
import { LoginService }    from '../login/login.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
	constructor(private loginService : LoginService){}
	
	// @Input isLoggedIn : boolean;
  public isLoggedIn : boolean = false;
  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn()?true:false;
  }
}