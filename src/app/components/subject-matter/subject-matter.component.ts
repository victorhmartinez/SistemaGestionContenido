import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectMatter } from 'src/app/models/subject-matter';
import { ItemCategory } from 'src/app/models/itemCategory';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SubjectMatterService } from 'src/app/services/subjectMatter.service';
import { UnirversityCareerService } from 'src/app/services/unirversity-career.service';//servicio titulacion
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ItemCategoryService } from 'src/app/services/itemCategory.service';


@Component({
  selector: 'app-subject-matter',
  templateUrl: './subject-matter.component.html',
  styleUrls: ['./subject-matter.component.css']
})
export class SubjectMatterComponent implements OnInit {
  listsubjectMatter: SubjectMatter[] = [];
  listItemUniversityCareer: ItemCategory[] = [];
  subjectMatterForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private subjectMatterService: SubjectMatterService,
    private itemCategoryService: ItemCategoryService,
  ) { 
    this.subjectMatterForm = this.createFormGroup();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  //Update UniversityCareer 
  updateListItemUniversityCategories() {
    this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemUniversityCareer = itemCategories;
    });
  }
//ALL
updateListSubjectMatter(){
  this.subjectMatterService.getSubjectMatter().subscribe(subjectMatter => {
    this.listsubjectMatter = subjectMatter;
    this.data= new MatTableDataSource<SubjectMatter>(this.listsubjectMatter);
      this.data.paginator=this.paginator;
  },
    error => {
      alert(JSON.stringify(error));
    }
  );
}
deleteSubjectMatter(id: number) {
  this.subjectMatterService.deleteSubjectMatter(id).subscribe(subjectMatter => {
    this.updateListSubjectMatter();
  },
    error => {
      alert(JSON.stringify(error));
    })

}

updateSubjectMatter(id: number) {
  alert(JSON.stringify(this.subjectMatterForm.valueChanges));
}
//Filter the table
applyFilter(filterValue: string) {
  this.data.filter = filterValue.trim().toLowerCase();
}
  ngOnInit() {
    this.updateListItemUniversityCategories();
    this.updateListSubjectMatter();
  }
  displayedColumns: string[] = ['name', 'semester', 'university_career_id', 'delete', 'update'];

  createFormGroup() {
    return new FormGroup({
      subject_matter_id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      semester:  new FormControl('', [
        Validators.required,
        
      ]),
      university_career_id:  new FormControl('', [
        Validators.required,
        
      ]),
    });
  }
  //Load data in form
  loadData(subjecMatterEdit: SubjectMatter) {
    this.subjectMatterForm.setValue({
      subject_matter_id: subjecMatterEdit.subject_matter_id,
      name: subjecMatterEdit.name,
      semester: subjecMatterEdit.semester,
      university_career_id: subjecMatterEdit.university_career_id,   

    })
  }
  
  //submit form
  submitForm() {
    if (this.subjectMatterForm.value.subject_matter_id == null) {
      if (this.subjectMatterForm.valid) {
        this.subjectMatterService.createSubjectMatter(this.subjectMatterForm.value).subscribe(subjectMatter => {
          this.updateListSubjectMatter();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.subjectMatterForm.valid) {
        this.subjectMatterService.updateSubjectMatter(this.subjectMatterForm.value).subscribe(subjectMatter => {
          this.updateListSubjectMatter();
        })
        this.resetForm();
      }
    }
  }

  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.subjectMatterForm.reset({ active: false });
    this.subjectMatterForm.markAsUntouched();
    Object.keys(this.subjectMatterForm.controls).forEach((nameControl) => {control = this.subjectMatterForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}
