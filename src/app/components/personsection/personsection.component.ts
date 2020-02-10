import { Component, OnInit, ViewChild } from '@angular/core';
//Services
import { PersonSectionService } from '../../services/personSection.service';
import { SectionService } from '../../services/section.service';
import { PersonService  } from '../../services/person.service';

//Models
import { Person } from '../../models/person';
import { Section } from '../../models/section';
import { PersonSection } from '../../models/personSection';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ItemCategoryRoleService } from 'src/app/services/itemCategoryRole.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-personsection',
  templateUrl: './personsection.component.html',
  styleUrls: ['./personsection.component.css']
})
export class PersonsectionComponent implements OnInit {

  listPersons: Person[] = [];
  listSection: Section[] = [];
  listPersonSection: PersonSection[] = [];
  personSectionForm: FormGroup;
  career:number;
  data:MatTableDataSource<any>;

  constructor(
    private personSectionService: PersonSectionService ,
    private personService: PersonService,
    private sectionService: SectionService,
  ) {
    this.personSectionForm = this.createFormGroup();
   }
   @ViewChild(MatPaginator) paginator: MatPaginator; 

    //
  updateListPersons() {
    this.personService.getPersons().subscribe(person => {
      this.listPersons = person;
    });
  }

  updateListSection(id:number) {
    this.sectionService.getSection(id).subscribe(section => {
      this.listSection = section;
    });
  }

  //All 
  updateListPersonSection() {
    this.personSectionService.getPersonSection().subscribe(personSection => {
      this.listPersonSection = personSection
      this.data= new MatTableDataSource<PersonSection>(this.listPersonSection);
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

  deletePersonSection(id: number) {
    this.personSectionService.deletePersonSection(id).subscribe(personSection => {
      this.updateListPersonSection();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }

  updatePersonSection(id: number) {
    alert(JSON.stringify(this.personSectionForm.valueChanges));
  }

  ngOnInit() {
    this.career=parseInt(localStorage.getItem('career'));
    this.updateListPersons();
    this.updateListSection(this.career) ;
    this.updateListPersonSection();
  
    
  }

  displayedColumns: string[] = ['person', 'section', 'delete', 'update'];

  createFormGroup() {
    return new FormGroup({
      person_section_id: new FormControl(),
      person_id: new FormControl('', [
        Validators.required,
      ]),
      section_id: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  //Load data in form
  loadData(personSectionEdit: PersonSection) {
    this.personSectionForm.setValue({
      person_section_id: personSectionEdit.person_section_id,
      person_id : personSectionEdit.person_id,
      section_id: personSectionEdit.section_id,

    })
  }

  //submit form
  submitForm() {
    if (this.personSectionForm.value.person_section_id == null) {
      if (this.personSectionForm.valid) {
        this.personSectionService.createPersonSection(this.personSectionForm.value).subscribe(sectionPerson => {
          this.updateListPersonSection();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.personSectionForm.valid) {
        this.personSectionService.updatePersonSection(this.personSectionForm.value).subscribe(sectionPerson => {
          this.updateListPersonSection();
        })
        this.resetForm();
      }
    }
  }

  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.personSectionForm.reset({ active: false });
    this.personSectionForm.markAsUntouched();
    Object.keys(this.personSectionForm.controls).forEach((nameControl) => {control = this.personSectionForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}

