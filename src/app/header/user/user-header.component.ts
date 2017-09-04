import { Component,Input } from '@angular/core';
import { LoginService }    from '../../login/login.service';
import { User }    from '../../user/user.model';
import { Router }   from '@angular/router';


@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html'
})
export class UserHeaderComponent {
  constructor(private loginService :LoginService,
    private router: Router){}
  logout(){
  	this.loginService.logout();
  	 window.location.reload();
  }

  @Input()
  user: User;


  @Input()
  siteSearch: string;
  ngOnInit(): void {
    	this.user = this.loginService.currentUser();
      this.siteSearch = '';
  }

  search(): void {
    this.router.navigate(['ads/',this.siteSearch]);
      
  }
}