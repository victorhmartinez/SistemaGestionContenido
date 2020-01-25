import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentType } from 'src/app/models/content-type';
import { ItemCategory } from 'src/app/models/itemCategory';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ContentTypeService } from 'src/app/services/content-type.service';
import { ItemCategoryService } from 'src/app/services/itemCategory.service';

@Component({
  selector: 'app-content-type',
  templateUrl: './content-type.component.html',
  styleUrls: ['./content-type.component.css']
})
export class ContentTypeComponent implements OnInit {
  listContentType: ContentType[] = [];
  listItemCategory: ItemCategory [] = [];
  contentTypeForm: FormGroup;
  data:MatTableDataSource<any>;
  constructor(
  
    private contentTypeService: ContentTypeService,
    private iIemCategoryService: ItemCategoryService,
  ) { 
    this.contentTypeForm = this.createFormGroup();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  //ItemCategory and Categories
 
  updateItemCategory() {
    this.iIemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategory = itemCategories;
    });
  }
   //all universityCarrer,itemcategories,Categories
   updateListContentType() {
    this.contentTypeService.getContentType().subscribe(universityCarrer => {
      this.listContentType = universityCarrer
      this.data= new MatTableDataSource<ContentType>(this.listContentType);
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
  deleteContentType(id: number) {
    this.contentTypeService.deleteContentType(id).subscribe(university => {
      this.updateListContentType();
    },
      error => {
        alert(JSON.stringify(error));
      })
  }
    //Update
  updateContentType(id: number) {
    alert(JSON.stringify(this.contentTypeForm.valueChanges));
  }

  ngOnInit() {
    this.updateItemCategory();
   
    this.updateListContentType();

  }
    //columns table
    displayedColumns: string[] = ['contentType','itemcategory', 'delete', 'update'];
     //FormGroup
  createFormGroup() {
    return new FormGroup({
      contentType_id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),

    });
  }
   //Load data in form
   loadData(contentTypeEdit: ContentType) {
    this.contentTypeForm.setValue({
      name:contentTypeEdit.name 
    })
  }
     //submit form
     submitForm() {
      if (this.contentTypeForm.value.contentType_id == null) {
        if (this.contentTypeForm.valid) {
          this.contentTypeService.createContentType(this.contentTypeForm.value).subscribe(UniversityCarrer => {
            this.updateListContentType();
          }, error => {
            alert(JSON.stringify(error));
          })
          this.resetForm();
        }
      }
      else {
        if (this.contentTypeForm.valid) {
          this.contentTypeService.updateContentType(this.contentTypeForm.value).subscribe(personContact => {
            this.updateListContentType();
          })
          this.resetForm();
        }
      }
    }

    resetForm() {
      let control: AbstractControl = null;
      this.contentTypeForm.reset({ active: false });
      this.contentTypeForm.markAsUntouched();
      Object.keys(this.contentTypeForm.controls).forEach((nameControl) => {control = this.contentTypeForm.controls[nameControl];
        control.setErrors(null);
      });
    }

}
