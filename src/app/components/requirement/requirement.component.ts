import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectMatter } from 'src/app/models/subject-matter';
import { Requirement } from 'src/app/models/requirement';
import { RequirementService } from 'src/app/services/requirement.service';
import { SubjectMatterService } from 'src/app/services/subjectMatter.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {
listSubjectMatter : SubjectMatter[] = [];
listSubjectMatterRequirement: SubjectMatter [] = [];
listRequirement : Requirement [] = [];

RequirementForm: FormGroup
data:MatTableDataSource<any>;

  constructor(
    private SubjectMatterService: SubjectMatterService,
    private RequirementService : RequirementService
  ) {
    this.RequirementForm = this.createFormGroup();
   }
   @ViewChild(MatPaginator) paginator: MatPaginator;

    //SubjectMatter
    updateListSubjectMatter() {
      this.SubjectMatterService.getSubjectMatter().subscribe(subjectMatter => {
        this.listSubjectMatter = subjectMatter;
      });
    }
    //subjectMatterRequirement
    updateListSubjectMatterRequirement() {
      this.SubjectMatterService.getSubjectMatter().subscribe(subjectMatter => {
        this.listSubjectMatterRequirement = subjectMatter;
      });
    }


    //all preRequirements
    updateListRequirement() {
      this.RequirementService.getRequirement().subscribe(requirement => {
        this.listRequirement = requirement;
        this.data= new MatTableDataSource<Requirement>(this.listRequirement);
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
  deleteRequirement(id: number) {
    this.RequirementService.deleteRequirement(id).subscribe(requirement => {
    this.updateListRequirement();
    },
      error => {
        alert(JSON.stringify(error));
      })
  }
  //Update
  updateRequirement(id: number) {
    alert(JSON.stringify(this.RequirementForm.valueChanges));
  }
  ngOnInit() {
    this.updateListRequirement();
    this.updateListSubjectMatter();
    this.updateListSubjectMatterRequirement();
  }
 //columns table
 displayedColumns: string[] = ['subject_matter_id', 'subject_matter_requeriment_id', 'delete', 'update'];
 
  //FormGroup
   createFormGroup() {
     return new FormGroup({
 
      requirement_id: new FormControl(),
      subject_matter_id: new FormControl('', [
         Validators.required,
       ]),
       subject_matter_requirement_id: new FormControl('', [
         Validators.required,
       ]),
     });
   }
     //Load data in form
     loadData(RequirementEdit: Requirement) {
      this.RequirementForm.setValue({
        requirement_id: RequirementEdit.requirement_id,
        subject_matter_id : RequirementEdit.subject_matter_id,
        subject_matter_requirement_id: RequirementEdit.subject_matter_requirement_id
  
      })
    }
    //submit form
    submitForm() {
      if (this.RequirementForm.value.requirement_id == null) {
        if (this.RequirementForm.valid) {
          this.RequirementService.createRequirement(this.RequirementForm.value).subscribe(requirement => {
            this.updateListRequirement();
          }, error => {
            alert(JSON.stringify(error));
          })
          this.resetForm();
        }
      }
      else {
        if (this.RequirementForm.valid) {
          this.RequirementService.updateRequirement(this.RequirementForm.value).subscribe(requirement => {
            this.updateListRequirement();
          })
          this.resetForm();
        }
      }
    }
    //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.RequirementForm.reset({ active: false });
    this.RequirementForm.markAsUntouched();
    Object.keys(this.RequirementForm.controls).forEach((nameControl) => {control = this.RequirementForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}
