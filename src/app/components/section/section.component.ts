import { Component, OnInit,  ViewChild } from '@angular/core';

//Services
import { SectionService } from '../../services/section.service';
//import { ItemCategoryService } from '../../services/itemCategory.service';

//Models
import { UniversityCarrer } from '../../models/universityCareer';
import { Section } from '../../models/section';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ItemCategory } from 'src/app/models/itemCategory';

//Utils
import { UniversityCarrerService  } from 'src/app/services/university-carrer.service';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {


  listItemUniversityCareer: ItemCategory[] = [];
  listSection: Section[] = [];
  sectionForm: FormGroup;
  career:number;
  data:MatTableDataSource<any>;

  constructor(
    private sectionService: SectionService,
    private universityService : UniversityCarrerService
  ) { 
    this.sectionForm = this.createFormGroup();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  
  /*updateListItemCategories() {
    this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategories = itemCategories;

    });
  }*/

  updateListUniversityC() {
    this.universityService.getUniversityCarrer().subscribe(universityC => {
      this.listItemUniversityCareer = universityC;

    });
  }


  //All 
  updateListSection(id:number) {
    this.sectionService.getSection(id).subscribe(section => {
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
  deleteSection(id: number,idCarrer:number) {
    this.sectionService.deleteSection(id).subscribe(section => {
      this.updateListSection(idCarrer);
    },
      error => {
        alert(JSON.stringify(error));
      })

  }
  updateSection(id: number) {
    alert(JSON.stringify(this.sectionForm.valueChanges));
  }

  ngOnInit() {
    this.career=parseInt(localStorage.getItem('career'));
    this.updateListSection(this.career);
    this.updateListUniversityC();
  }

  displayedColumns: string[] = ['university_career_id', 'name', 'delete', 'update'];


  createFormGroup() {
    return new FormGroup({
      section_id: new FormControl(),
      university_career_id: new FormControl('', [
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
      university_career_id: sectionEdit.university_career_id,
      name: sectionEdit.name

      

    })
  }

  //submit form
  submitForm(idCarrer:number) {
    if (this.sectionForm.value.section_id == null) {
      if (this.sectionForm.valid) {
        this.sectionService.createSection(this.sectionForm.value).subscribe(section => {
          this.updateListSection(idCarrer);
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.sectionForm.valid) {
        this.sectionService.updateSection(this.sectionForm.value).subscribe(section => {
          this.updateListSection(idCarrer);
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
