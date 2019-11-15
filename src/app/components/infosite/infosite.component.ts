import { Component, OnInit, ViewChild } from '@angular/core';
//Services

import { InfoSiteService } from '../../services/infoSite.service';
import { ItemCategoryService } from '../../services/itemCategory.service';
import { UnirversityCareerService } from 'src/app/services/unirversity-career.service';
//Models
import { ItemCategory } from '../../models/itemCategory';
import { InfoSite } from '../../models/infoSite';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-infosite',
  templateUrl: './infosite.component.html',
  styleUrls: ['./infosite.component.css']
})
export class InfositeComponent implements OnInit {
  listItemCategories: ItemCategory[] = [];
  listInfoSites: InfoSite[] = [];
  listItemUniversityCareer: ItemCategory[] = [];
  infoSiteForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private infoSiteService: InfoSiteService,
    private itemCategoryService: ItemCategoryService,
    private universityCareerService: UnirversityCareerService
  ) {
    this.infoSiteForm = this.createFormGroup();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator; 


  updateListItemCategories() {
    this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategories = itemCategories;
    });
  }
  //Update UniversityCareer
  updateListItemUniversityCategories() {
    this.universityCareerService.getUniversityCareer().subscribe(itemCategories => {
      this.listItemUniversityCareer = itemCategories;
    });
  }
  //ALL
  updateListInfoSite() {
    this.infoSiteService.getInfoSite().subscribe(infosite => {
      this.listInfoSites = infosite
      this.data= new MatTableDataSource <InfoSite>(this.listInfoSites);
      this.data.paginator= this.paginator;
    },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }

  deleteInfoSite(info_site_id: number) {
    this.infoSiteService.deleteInfoSite(info_site_id).subscribe(infoSite => {
      this.updateListInfoSite();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }
   //Filter the table
   applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.updateListItemCategories();
    this.updateListItemUniversityCategories();
    this.updateListInfoSite();
  }
  displayedColumns: string[] = [ 'description', 'type_info','info_site_universitycareer', 'delete', 'update'];

  //Create new form
  createFormGroup() {
    return new FormGroup({
      info_site_id: new FormControl(),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ]),
      type_info: new FormControl('', [
        Validators.required,
      ]),
      info_site_universitycareer: new FormControl('', [
        Validators.required,
      ]),

    });
  }

  //Load data in form
  loadData(infoSiteEdit: InfoSite) {
    this.infoSiteForm.setValue({
      info_site_id: infoSiteEdit.info_site_id,
      description: infoSiteEdit.description,
      type_info: infoSiteEdit.type_info,
      info_site_universitycareer:infoSiteEdit.info_site_universitycareer
    })
  }

  //submit form

  submitForm() {
    if (this.infoSiteForm.value.info_site_id == null) {
      if (this.infoSiteForm.valid) {
        this.infoSiteService.createInfoSite(this.infoSiteForm.value).subscribe(infoSite => {
          this.updateListInfoSite();
        })
        this.resetForm();
      }
    } else {
      if (this.infoSiteForm.valid) {

        this.infoSiteService.updateInfoSite(this.infoSiteForm.value).subscribe(infoSite => {
          this.updateListInfoSite();
        })
        this.resetForm();
      }
    }

  }
  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.infoSiteForm.reset({ active: false });
    this.infoSiteForm.markAsUntouched();
    Object.keys(this.infoSiteForm.controls).forEach((nameControl) => {
      control = this.infoSiteForm.controls[nameControl];
      control.setErrors(null);

    });

  }
}

