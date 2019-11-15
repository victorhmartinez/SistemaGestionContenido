import { Component, ViewEncapsulation } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  `]
})
export class AppComponent {
  
  title = 'WebPrincipal';
  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' });
  }

  login(){
    this.router.navigate(['/administracion']);    
  } 
}
