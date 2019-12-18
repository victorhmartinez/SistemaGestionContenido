import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
public is_SuperAdmin:boolean;
public is_Admin:boolean;
  constructor(private authService:AuthService, private router: Router) { }


  ngOnInit() {
    this.isSuperAdmin();
  }
  title = 'AngularMaterialGettingStarted';

  isMenuOpen = true;
  contentMargin = 240;

  task: string[] = [
    'Clearning out my closet', 'Take out trash bins', 'Wash car', 'Tank up the motorcycles', 'Go for flight training'
  ]

  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
  // sidenavEvents(str) {
  //   console.log(str);
// }
logout(){
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('currentUser');
  this.router.navigateByUrl('');
 
}
isSuperAdmin(){
  if( this.authService.getUserRoles){
    console.log(this.authService.getUserRoles())
 this.is_SuperAdmin=false;
 
  }else{
    console.log(this.authService.getUserRoles())
    this.is_SuperAdmin=true;
  }
 }

}
