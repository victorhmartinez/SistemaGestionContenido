import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import{DataFrontpageService}from 'src/app/services/data-frontpage.service'
import { ItemCategory } from 'src/app/models/itemCategory';
import { UniversityCarrer } from 'src/app/models/universityCareer';
import { UniversityCarrerService } from 'src/app/services/university-carrer.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.css']
})
export class MallaComponent implements OnInit {
  carrera: { name: string };//APLICACION CARRERAS
  listMenu: ItemCategory[] = [];
  listMaterias  = [];
  listRequirements = [];
  public bandera = new ItemCategory();
  constructor(
    private menuService: MenuService,
    private dataFronpage:DataFrontpageService,
    private rutaActiva: ActivatedRoute,
    private universityService:UniversityCarrerService
  ) { }

  ngOnInit() {
    this.updateListMenu();
   
    //console.log(this.listMaterias);

    this.carrera = {
      name: this.rutaActiva.snapshot.params.name
    };
    console.log('ruta', this.carrera.name);
  
    this.pruba(this.carrera.name);
  }


  async pruba(name: string) {
    await this.universityService.getUniversityCarrerID2(name).subscribe(carerr => {
      console.log();
      this.bandera = carerr;

      console.log('Prueba', this.bandera.name);
      console.log('El id', this.bandera.item_category_id);
    let career=this.bandera.item_category_id.toString();
      localStorage.setItem('career',career);
      //return this.bandera.item_category_id;
    },
      error => {
        console.log("Error " + error);
      },
      () => {
        console.log("Completado!!!!!!!!!!!");
        console.log('hola mundo', this.bandera.name);
        this.getListMaterias(this.bandera.item_category_id);
   
        //presentarMensaje(textoBienvenida);


      });

   
  }
  updateListMenu() {
    this.dataFronpage.getMenu().subscribe(menu => {
      this.listMenu = menu;
    },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
  getListMaterias(idCarrer:number){
    this.dataFronpage.getMallaCareer(idCarrer).subscribe((materias:any) =>this.listMaterias=materias);
    this.dataFronpage.getMallaCareer(idCarrer).subscribe(materias =>console.log('Estas son las materias',materias));
    // console.log('prueba')
  }

 
}
