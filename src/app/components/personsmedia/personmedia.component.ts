import { Component, OnInit, ViewChild } from '@angular/core';
//Services
import { PersonMediaService  } from '../../services/personMedia.service';
import { ItemCategoryService } from '../../services/itemCategory.service';
import { PersonService  } from '../../services/person.service';

//Models
import { Person } from '../../models/person';
import { ItemCategory } from '../../models/itemCategory';
import { PersonMedia } from '../../models/personMedia';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-personmedia',
  templateUrl: './personmedia.component.html',
  styleUrls: ['./personmedia.component.css']
})
export class PersonsmediaComponent implements OnInit {

  listPersons: Person[] = [];
  listItemCategories: ItemCategory[] = [];
  listPersonMedia: PersonMedia[] = [];
  personMediaForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private personMediaService: PersonMediaService ,
    private personService: PersonService,
    private itemCategoryService: ItemCategoryService,
  ) {
    this.personMediaForm = this.createFormGroup();
   }
   @ViewChild(MatPaginator) paginator: MatPaginator; 
   //Persons and Categories
  updateListPersons() {
    this.personService.getPersons().subscribe(person => {
      this.listPersons = person;
    });
  }

  updateListItemCategories() {//ejemplo
    this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategories = itemCategories;
    });
  }

   //All 
   updateListPersonMedia() {
    this.personMediaService.getPersonMedia().subscribe(personMedia => {
      this.listPersonMedia = personMedia
      this.data= new MatTableDataSource<PersonMedia>(this.listPersonMedia);
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
  deletePersonMedia(id: number) {
    this.personMediaService.deletePersonMedia(id).subscribe(persons => {
      this.updateListPersonMedia();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }

  updatePersonMedia(id: number) {
    alert(JSON.stringify(this.personMediaForm.valueChanges));
  }

  ngOnInit() {
    this.updateListPersons();
    this.updateListItemCategories();
    this.updateListPersonMedia();
  
  }

  displayedColumns: string[] = ['path', 'person', 'itemCategory', 'delete', 'update'];

  createFormGroup() {
    return new FormGroup({
      person_media_id: new FormControl(),
      path: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      item_category_id: new FormControl('', [
        Validators.required,
      ]),
      person_id: new FormControl('', [
        Validators.required,
      ]), 
    });
  }

  //Load data in form
  loadData(personMediaEdit: PersonMedia) {
    this.personMediaForm.setValue({
      persons_media_id: personMediaEdit.person_media_id,
      path: personMediaEdit.path,
      item_category_id: personMediaEdit.item_category_id,
      person_id : personMediaEdit.person_id,
      

    })
  }

  //submit form
  submitForm() {
    if (this.personMediaForm.value.person_media_id == null) {
      if (this.personMediaForm.valid) {
        this.personMediaService.createPersonMedia(this.personMediaForm.value).subscribe(mediaPerson => {
          this.updateListPersonMedia();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.personMediaForm.valid) {
        this.personMediaService.updatePersonMedia(this.personMediaForm.value).subscribe(mediaPerson => {
          this.updateListPersonMedia();
        })
        this.resetForm();
      }
    }
  }

  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.personMediaForm.reset({ active: false });
    this.personMediaForm.markAsUntouched();
    Object.keys(this.personMediaForm.controls).forEach((nameControl) => {control = this.personMediaForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}
