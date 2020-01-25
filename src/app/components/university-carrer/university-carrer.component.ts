import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ItemCategory } from 'src/app/models/itemCategory';
import { UniversityCarrer } from 'src/app/models/university-carrer';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';
import { UniversityCarrerService } from 'src/app/services/university-carrer.service';
import { ItemCategoryService } from 'src/app/services/itemCategory.service';

@Component({
  selector: 'app-university-carrer',
  templateUrl: './university-carrer.component.html',
  styleUrls: ['./university-carrer.component.css']
})
export class UniversityCarrerComponent implements OnInit {
  listCategory: Category[] = [];
  listUnivesersityCarrer: UniversityCarrer[] = [];
  listItemCategory: ItemCategory [] = [];
  universityCarrerForm: FormGroup;
  data:MatTableDataSource<any>;
  constructor(
    private categoryService: CategoryService ,
    private universityCarrerService: UniversityCarrerService,
    private iIemCategoryService: ItemCategoryService,
  ) { 
    this.universityCarrerForm = this.createFormGroup();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  //ItemCategory and Categories
 
  updateItemCategory() {
    this.iIemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategory = itemCategories;
    });
  }
   //all universityCarrer,itemcategories,Categories
   updateListUniversityCarrer() {
    this.universityCarrerService.getUniversityCarrer().subscribe(universityCarrer => {
      this.listUnivesersityCarrer = universityCarrer
      this.data= new MatTableDataSource<UniversityCarrer>(this.listUnivesersityCarrer);
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
  deleteUniversityCarrer(id: number) {
    this.universityCarrerService.deleteUniversityCarrer(id).subscribe(university => {
      this.updateListUniversityCarrer();
    },
      error => {
        alert(JSON.stringify(error));
      })
  }
    //Update
  updateUniversityCarrer(id: number) {
    alert(JSON.stringify(this.universityCarrerForm.valueChanges));
  }

  ngOnInit() {
    this.updateItemCategory();
   
    this.updateListUniversityCarrer();

  }
    //columns table
    displayedColumns: string[] = ['universityCarrer','itemcategory', 'delete', 'update'];
     //FormGroup
  createFormGroup() {
    return new FormGroup({
      universityCarrer_id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),

    });
  }
   //Load data in form
   loadData(universityCarrerEdit: UniversityCarrer) {
    this.universityCarrerForm.setValue({
      name:universityCarrerEdit.name 
    })
  }
     //submit form
     submitForm() {
      if (this.universityCarrerForm.value.universityCarrer_id == null) {
        if (this.universityCarrerForm.valid) {
          this.universityCarrerService.createUniversityCarrer(this.universityCarrerForm.value).subscribe(UniversityCarrer => {
            this.updateListUniversityCarrer();
          }, error => {
            alert(JSON.stringify(error));
          })
          this.resetForm();
        }
      }
      else {
        if (this.universityCarrerForm.valid) {
          this.universityCarrerService.updateUniversityCarrer(this.universityCarrerForm.value).subscribe(personContact => {
            this.updateListUniversityCarrer();
          })
          this.resetForm();
        }
      }
    }

    resetForm() {
      let control: AbstractControl = null;
      this.universityCarrerForm.reset({ active: false });
      this.universityCarrerForm.markAsUntouched();
      Object.keys(this.universityCarrerForm.controls).forEach((nameControl) => {control = this.universityCarrerForm.controls[nameControl];
        control.setErrors(null);
      });
    }
}
