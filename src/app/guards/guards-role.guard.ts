import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/';
import {AuthService}from '../services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class GuardsRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  //Guards
  canActivate() {
    if(this.authService.getUserSuper_admin()){
      console.log(this.authService.getUserSuper_admin())
      return true;
    }else{
      this.router.navigate(['/administracion'])
      console.log(this.authService.getUserSuper_admin())
      return false;
      
    }
  }
 

  
}
