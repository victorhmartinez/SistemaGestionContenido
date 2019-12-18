import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

//SERVICE
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  
 
  constructor(private authService: AuthService, private router: Router) { }

  //Guards
  canActivate() {
    if (this.authService.getCurrentUser()) {
      // login TRUE
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
 
  
  


  

  
}

