import { Component, OnInit,  ViewChild } from '@angular/core';

//Services
import { SectionService } from '../../services/section.service';
import { ItemCategoryService } from '../../services/itemCategory.service';

//Models
import { ItemCategory } from '../../models/itemCategory';
import { Section } from '../../models/section';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {


  listItemCategories: ItemCategory[] = [];
  listSection: Section[] = [];
  sectionForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private sectionService: SectionService,
    private itemCategoryService: ItemCategoryService,
  ) { 
    this.sectionForm = this.createFormGroup();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  updateListItemCategories() {
    this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategories = itemCategories;

    });
  }

  //All 
  updateListSection() {
    this.sectionService.getSection().subscribe(section => {
      this.listSection = section;
      this.data= new MatTableDataSource<Section>(this.listSection);
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
  deleteSection(id: number) {
    this.sectionService.deleteSection(id).subscribe(section => {
      this.updateListSection();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }
  updateSection(id: number) {
    alert(JSON.stringify(this.sectionForm.valueChanges));
  }

  ngOnInit() {
    this.updateListSection();
    this.updateListItemCategories();
  }

  displayedColumns: string[] = ['universitycarrer', 'name', 'delete', 'update'];


  createFormGroup() {
    return new FormGroup({
      section_id: new FormControl(),
      universitycarrer: new FormControl('', [
        Validators.required,
      ]), 
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
    });
  }

   //Load data in form
   loadData(sectionEdit: Section) {
    this.sectionForm.setValue({
      section_id: sectionEdit.section_id,
      universitycarrer: sectionEdit.universitycarrer,
      name: sectionEdit.name

      

    })
  }

  //submit form
  submitForm() {
    if (this.sectionForm.value.section_id == null) {
      if (this.sectionForm.valid) {
        this.sectionService.createSection(this.sectionForm.value).subscribe(section => {
          this.updateListSection();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.sectionForm.valid) {
        this.sectionService.updateSection(this.sectionForm.value).subscribe(section => {
          this.updateListSection();
        })
        this.resetForm();
      }
    }
  }

  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.sectionForm.reset({ active: false });
    this.sectionForm.markAsUntouched();
    Object.keys(this.sectionForm.controls).forEach((nameControl) => {control = this.sectionForm.controls[nameControl];
      control.setErrors(null);
    });
  }

}
