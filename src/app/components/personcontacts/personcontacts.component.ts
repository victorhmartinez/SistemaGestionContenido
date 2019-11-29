import { Component, OnInit, ViewChild } from '@angular/core';
//Models
import { Person } from 'src/app/models/person';
import { ItemCategory } from 'src/app/models/itemCategory';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PersonContact } from 'src/app/models/personcontact';
//Services
import { PersonContactService } from 'src/app/services/personContact.service';
import { PersonService } from 'src/app/services/person.service';
import { ItemCategoryService } from 'src/app/services/itemCategory.service';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UnirversityCareerService } from 'src/app/services/unirversity-career.service';

@Component({
  selector: 'app-personcontacts',
  templateUrl: './personcontacts.component.html',
  styleUrls: ['./personcontacts.component.css']
})
export class PersoncontactsComponent implements OnInit {
  listPersons: Person[] = [];
  listContactType: ItemCategory[] = [];
  listPersonContact: PersonContact [] = [];
  personContactForm: FormGroup;
  data:MatTableDataSource<any>;
  constructor(
    private personContactService: PersonContactService ,
    private personService: PersonService,
    private universityCareerService: UnirversityCareerService,
  ) { 
    this.personContactForm = this.createFormGroup();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator; 

   //Persons and Categories
   updateListPersons() {
    this.personService.getPersons().subscribe(person => {
      this.listPersons = person;
    });
  }
  updateContactType() {//OJOOOOO SERVICIOS ANERIORE
    this.universityCareerService.getTypeContact().subscribe(itemCategories => {
      this.listContactType = itemCategories;
    });
  }
  //all person,itemcategories,contacts
  updateListPersonContact() {
    this.personContactService.getPersonContact().subscribe(personContact => {
      this.listPersonContact = personContact
      this.data= new MatTableDataSource<PersonContact>(this.listPersonContact);
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
  deletePersonContact(id: number) {
    this.personContactService.deletePersonContact(id).subscribe(persons => {
      this.updateListPersonContact();
    },
      error => {
        alert(JSON.stringify(error));
      })
  }
  //Update
  updatePersonContact(id: number) {
    alert(JSON.stringify(this.personContactForm.valueChanges));
  }

  ngOnInit() {
    this.updateListPersons();
    this.updateContactType();
    this.updateListPersonContact();
  }
  //columns table
  displayedColumns: string[] = ['contact','typeContact', 'person', 'delete', 'update'];
  
  //FormGroup
  createFormGroup() {
    return new FormGroup({
      person_contact_id: new FormControl(),
      contact:new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      contact_type_id: new FormControl('', [
        Validators.required,
      ]),
      person_id: new FormControl('', [
        Validators.required,
      ]),
      
    });
  }
   //Load data in form
   loadData(personContactEdit: PersonContact) {
    this.personContactForm.setValue({
      person_contact_id: personContactEdit.person_contact_id,
      contact:personContactEdit.contact,
      contact_type_id : personContactEdit.contact_type_id,
      person_id: personContactEdit.person_id,
      
    })
  }
    //submit form
    submitForm() {
      if (this.personContactForm.value.person_contact_id == null) {
        if (this.personContactForm.valid) {
          this.personContactService.createPersonContact(this.personContactForm.value).subscribe(personContact => {
            this.updateListPersonContact();
          }, error => {
            alert(JSON.stringify(error));
          })
          this.resetForm();
        }
      }
      else {
        if (this.personContactForm.valid) {
          this.personContactService.updatePersonContact(this.personContactForm.value).subscribe(personContact => {
            this.updateListPersonContact();
          })
          this.resetForm();
        }
      }
    }
    //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.personContactForm.reset({ active: false });
    this.personContactForm.markAsUntouched();
    Object.keys(this.personContactForm.controls).forEach((nameControl) => {control = this.personContactForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}


