import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/menu';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/models/content';
import { DataFrontpageService } from 'src/app/services/data-frontpage.service';

@Component({
  selector: 'app-vermas-mensajes',
  templateUrl: './vermas-mensajes.component.html',
  styleUrls: ['./vermas-mensajes.component.css']
})
export class VermasMensajesComponent implements OnInit {
  listPersons: Person[] = [];
  listMenu: Menu[] = [];
  listMensajes: Content[] = [];
  constructor(
    private personService: PersonService,
    private menuService: MenuService,
    private frontPageDataService : DataFrontpageService
  ) { }

  ngOnInit() {
    this.updateListPersons();
    this.updateListMenu();
    //this.updateListMensajes();
  }
  //Listas Autoridades
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
  /*
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
