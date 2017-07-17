import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { LoginService }    from '../login/login.service';

@Injectable()
export class CanActivateViaOAuthGuard implements CanActivate {

  constructor(private router : Router,
              private loginService : LoginService) {}
  
  canActivate() {

    if(this.loginService.isLoggedIn() == false){
      this.router.navigateByUrl('/login');
    }
    return this.loginService.isLoggedIn()?true:false
  }

 
}
