import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { DataFrontpageService } from 'src/app/services/data-frontpage.service';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-vermas-testimonios',
  templateUrl: './vermas-testimonios.component.html',
  styleUrls: ['./vermas-testimonios.component.css']
})
export class VermasTestimoniosComponent implements OnInit {


  listMenu:Menu[] = [];
  listTestimonios: Content[] = [];
  constructor(
    private frontPageDataService : DataFrontpageService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
 // this.updateListTestimonios();
    this.updateListMenu();
  }
  /*
//Lista Testimonios
updateListTestimonios() {
  this.frontPageDataService.getTestimonios().subscribe(testimonio => {
    this.listTestimonios = testimonio;
  },
    error => {
      alert(JSON.stringify(error));
    }
  );
}*/
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
