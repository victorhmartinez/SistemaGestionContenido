import { Component, OnInit, ViewChild } from '@angular/core';
import { AcademicPeriod } from 'src/app/models/academic-period';
import { ItemCategory } from 'src/app/models/itemCategory';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AcademicPeriodService } from 'src/app/services/academic-period.service';
import { ItemCategoryService } from 'src/app/services/itemCategory.service';

@Component({
  selector: 'app-academic-period',
  templateUrl: './academic-period.component.html',
  styleUrls: ['./academic-period.component.css']
})
export class AcademicPeriodComponent implements OnInit {

  
  listAcademicPeriod: AcademicPeriod[] = [];
  listItemCategory: ItemCategory [] = [];
  academicPeriodForm: FormGroup;
  data:MatTableDataSource<any>;
  constructor(
    
    private academicPeriodService: AcademicPeriodService,
    private iIemCategoryService: ItemCategoryService,
  ) { 
    this.academicPeriodForm = this.createFormGroup();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  //ItemCategory and Categories
 
  updateItemCategory() {
    this.iIemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategory = itemCategories;
    });
  }
   //all universityCarrer,itemcategories,Categories
   updateListAcademicPeriod() {
    this.academicPeriodService.getAcademyPeriod().subscribe(universityCarrer => {
      this.listAcademicPeriod = universityCarrer
      this.data= new MatTableDataSource<AcademicPeriod>(this.listAcademicPeriod);
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
  deleteAcademicPeriod(id: number) {
    this.academicPeriodService.deleteAcademyPeriod(id).subscribe(university => {
      this.updateListAcademicPeriod();
    },
      error => {
        alert(JSON.stringify(error));
      })
  }
    //Update
  updateAcademicPeriod(id: number) {
    alert(JSON.stringify(this.academicPeriodForm.valueChanges));
  }

  ngOnInit() {
    this.updateItemCategory();
   
    this.updateListAcademicPeriod();

  }
    //columns table
    displayedColumns: string[] = ['name','academicPeriod_id', 'delete', 'update'];
     //FormGroup
  createFormGroup() {
    return new FormGroup({
      academicPeriod_id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),

    });
  }
   //Load data in form
   loadData(academicPeriodEdit: AcademicPeriod) {
    this.academicPeriodForm.setValue({
      name:academicPeriodEdit.name 
    })
  }
     //submit form
     submitForm() {
      if (this.academicPeriodForm.value.academicPeriod_id == null) {
        if (this.academicPeriodForm.valid) {
          this.academicPeriodService.createAcademyPeriod(this.academicPeriodForm.value).subscribe(UniversityCarrer => {
            this.updateListAcademicPeriod();
          }, error => {
            alert(JSON.stringify(error));
          })
          this.resetForm();
        }
      }
      else {
        if (this.academicPeriodForm.valid) {
          this.academicPeriodService.updateAcademyPeriod(this.academicPeriodForm.value).subscribe(personContact => {
            this.updateListAcademicPeriod();
          })
          this.resetForm();
        }
      }
    }

    resetForm() {
      let control: AbstractControl = null;
      this.academicPeriodForm.reset({ active: false });
      this.academicPeriodForm.markAsUntouched();
      Object.keys(this.academicPeriodForm.controls).forEach((nameControl) => {control = this.academicPeriodForm.controls[nameControl];
        control.setErrors(null);
      });
    }

}
