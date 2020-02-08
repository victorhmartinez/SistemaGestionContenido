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
import { ItemCategory } from 'src/app/models/itemCategory';

//Utils
import { UniversityCarrerService } from '../../services/university-carrer.service';
import { Observable } from 'rxjs';
import { Section } from 'src/app/models/section';
import { map } from 'rxjs/operators';

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
  carrera: { name: string };//APLICACION CARRERAS

  listAutoridades = [];
  listMenu: ItemCategory[] = [];
  listTestimonios: Content[] = [];
  
  listSecciones:Section [] = [];
  carreraUnica: ItemCategory[] = [];
  messageWelcome: Content [] = [];
  public isError = false;



  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router,
    private authService: AuthService,
    
    private frontPageDataService: DataFrontpageService,
    private testimoniosService: ContentService,
    private rutaActiva: ActivatedRoute,

    private universityService: UniversityCarrerService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = true;



  }
  public bandera = new ItemCategory();
  //Arreglo para guardar los item category
  //itemCategory: Observable<ItemCategory[]> = new Observable();

  public prueba: ItemCategory;
  ngOnInit() {
    //this.updateListPersons();
    this.updateListMenu();
   // this.updateListTestimonios();
    //this.updateListMensajes();
    this.carrera = {
      name: this.rutaActiva.snapshot.params.name
    };
    console.log('ruta', this.carrera.name);
    //this.getUnicaCarrera(this.carrera.name);
    this.pruba(this.carrera.name);
    //console.log('ds',this.prueba.item_category_id);

  }
  async pruba(name: string) {
    await this.universityService.getUniversityCarrerID2(name).subscribe(carerr => {
      console.log();
      this.bandera = carerr;

      console.log('Prueba', this.bandera.name);
      console.log('El id', this.bandera.item_category_id);
      //return this.bandera.item_category_id;
    },
      error => {
        console.log("Error " + error);
      },
      () => {
        console.log("Completado!!!!!!!!!!!");
        console.log('hola mundo', this.bandera.name);
        this.getMessageWelcome(this.bandera.item_category_id);
        this.getSeccionesCareer(this.bandera.item_category_id);
        this.getAutoridadesCareer(this.bandera.item_category_id);
        //presentarMensaje(textoBienvenida);


      });

    await console.log('hola mundo', this.bandera.name);
  }

  getMessageWelcome(id: number) {
    this.frontPageDataService.getMensajeBienvenida(id).subscribe(message => {
      this.messageWelcome = message;
      console.log('Mensaje Bienvenida Sistemas Papa',this.messageWelcome)
    })
  }
  getSeccionesCareer(id:number){
this.frontPageDataService.getSeccionesCareer(id).subscribe(secciones =>{
  this.listSecciones=secciones;
  console.log('Secciones de la carrera',this.listSecciones);

})
  }
  getAutoridadesCareer(id:number){
    this.frontPageDataService.getPersonCareer(id).subscribe((autoridad:any) =>this.listAutoridades=autoridad);
    this.frontPageDataService.getPersonCareer(id).subscribe(autoridad =>console.log('Autoridades',autoridad));
  }

  /*getUnicaCarrera(name:string){
    this.universityService.getUniversityCarrerID2(name).subscribe(item=>{
      this.carreraUnica=item;
      console.log('otro',this.carreraUnica)
    })
  }   */

  onLogin(form): void {
    console.log('login', form.value);

    if (form.valid == true) {
      this.authService.login(form.value).subscribe(res => {
        this.router.navigateByUrl(this.carrera.name + '/administracion');
        this.modalService.dismissAll();
      },
        error => {
          this.isError = true;

        });
    }
    //this.modalService.dismissAll();
  }
  //this.isError=true;
  //this.modalService.dismissAll();



  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' });

  }//Listas Autoridades
  updateListPersons() {
  
  }

  //Lista de Menus
  updateListMenu() {
    this.frontPageDataService.getMenu().subscribe(menu => {
      this.listMenu = menu;
    },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
  /*
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
  }*/

}
