import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeContact } from 'src/app/models/type-contact';
import { ItemCategory } from 'src/app/models/itemCategory';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TypeContactService } from 'src/app/services/type-contact.service';
import { ItemCategoryService } from 'src/app/services/itemCategory.service';

@Component({
  selector: 'app-type-contact',
  templateUrl: './type-contact.component.html',
  styleUrls: ['./type-contact.component.css']
})
export class TypeContactComponent implements OnInit {

  
  listTypeContact: ItemCategory[] = [];
  listItemCategory: ItemCategory [] = [];
  typeContactForm: FormGroup;
  data:MatTableDataSource<any>;
  constructor(
  
    private typeContactService: TypeContactService,
    private iIemCategoryService: ItemCategoryService,
  ) { 
    this.typeContactForm = this.createFormGroup();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  //ItemCategory and Categories
 
  updateItemCategory() {
    this.iIemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategory = itemCategories;
    });
  }
   //all universityCarrer,itemcategories,Categories
   updateListTypeContact() {
    this.typeContactService.getTypeContact().subscribe(universityCarrer => {
      this.listTypeContact = universityCarrer
      this.data= new MatTableDataSource<ItemCategory>(this.listTypeContact);
      this.data.paginator=this.paginator;
    },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
   //Filter the table
   applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
  //Delete
  deleteTypeContact(id: number) {
    this.typeContactService.deleteTypeContact(id).subscribe(university => {
      this.updateListTypeContact();
    },
      error => {
        alert(JSON.stringify(error));
      })
  }
    //Update
  updateTypeContact(id: number) {
    alert(JSON.stringify(this.typeContactForm.valueChanges));
  }

  ngOnInit() {
    this.updateItemCategory();
   
    this.updateListTypeContact();

  }
    //columns table
    displayedColumns: string[] = ['typeContact','itemcategory', 'delete', 'update'];
     //FormGroup
  createFormGroup() {
    return new FormGroup({
      typeContact_id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),

    });
  }
   //Load data in form
   loadData(typeContactEdit: TypeContact) {
    this.typeContactForm.setValue({
      name:typeContactEdit.name 
    })
  }
     //submit form
     submitForm() {
      if (this.typeContactForm.value.typeContact_id == null) {
        if (this.typeContactForm.valid) {
          this.typeContactService.createTypeContact(this.typeContactForm.value).subscribe(UniversityCarrer => {
            this.updateListTypeContact();
          }, error => {
            alert(JSON.stringify(error));
          })
          this.resetForm();
        }
      }
      else {
        if (this.typeContactForm.valid) {
          this.typeContactService.updateTypeContact(this.typeContactForm.value).subscribe(personContact => {
            this.updateListTypeContact();
          })
          this.resetForm();
        }
      }
    }

    resetForm() {
      let control: AbstractControl = null;
      this.typeContactForm.reset({ active: false });
      this.typeContactForm.markAsUntouched();
      Object.keys(this.typeContactForm.controls).forEach((nameControl) => {control = this.typeContactForm.controls[nameControl];
        control.setErrors(null);
      });
    }

}
