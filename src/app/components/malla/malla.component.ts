import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import{DataFrontpageService}from 'src/app/services/data-frontpage.service'
import { ItemCategory } from 'src/app/models/itemCategory';
@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.css']
})
export class MallaComponent implements OnInit {
  listMenu: ItemCategory[] = [];
  listMaterias  = [];
  listRequirements = [];
  constructor(
    private menuService: MenuService,
    private dataFronpage:DataFrontpageService
  ) { }

  ngOnInit() {
    this.updateListMenu();
    this.getListMaterias(1);
    //console.log(this.listMaterias);
  
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
