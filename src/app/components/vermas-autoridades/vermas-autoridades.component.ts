import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-vermas-autoridades',
  templateUrl: './vermas-autoridades.component.html',
  styleUrls: ['./vermas-autoridades.component.css']
})
export class VermasAutoridadesComponent implements OnInit {
  listPersons: Person[] = [];
  listMenu:Menu[] = [];
  constructor(
    private personService :PersonService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.updateListPersons();
    this.updateListMenu();
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
}
