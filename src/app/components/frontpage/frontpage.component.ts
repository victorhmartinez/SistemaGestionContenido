import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { AuthService } from '../../services/auth.service';
import { Person } from 'src/app/models/person';
import { Menu } from 'src/app/models/menu';
import { DataFrontpageService } from 'src/app/services/data-frontpage.service';
import { MenuService } from 'src/app/services/menu.service';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/models/content';
@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css'],
  providers: [NgbModalConfig, NgbModal],
  
  styles: [`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: green;
  }
  `]
})
export class FrontpageComponent implements OnInit {
  carrera: {name: string};//APLICACION CARRERAS
  
  listPersons: Person[] = [];
  listMenu: Menu[] = [];
  listTestimonios: Content[] = [];
  listMensajes: Content[] = [];


  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router ,
    private authService: AuthService,
    private personService: PersonService, 
    private menuService: MenuService,
    private frontPageDataService : DataFrontpageService,
    private testimoniosService:ContentService,
    private rutaActiva:ActivatedRoute) { 
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = true;
    

    
  }

  ngOnInit() {
    this.updateListPersons();
    
    this.updateListMenu();
    this.updateListTestimonios();
    this.updateListMensajes();
    this.carrera = {
      name: this.rutaActiva.snapshot.params.name};
  }

  onLogin(form): void {
    console.log('login', form.value);
    
    this.authService.login(form.value).subscribe(res => {
      this.router.navigateByUrl('/administracion');
    }); 
    this.modalService.dismissAll();
  }


  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' });
  
  }//Listas Autoridades
  updateListPersons() {
    this.personService.getPersons().subscribe(person => {
      this.listPersons = person;
    });
  }

  //Lista de Menus
  updateListMenu() {
    this.menuService.getMenu().subscribe(menu => {
      this.listMenu = menu;
    },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
  // Lista testimonios
  updateListTestimonios() {
    this.frontPageDataService.getTestimonios().subscribe(testimonio => {
      this.listTestimonios = testimonio;
    },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
  //Lista de mensajes
  updateListMensajes() {
    this.frontPageDataService.getMensajes().subscribe(mensajes => {
      this.listMensajes = mensajes;
    },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
}
