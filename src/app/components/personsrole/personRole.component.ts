import { Component, OnInit, ViewChild } from '@angular/core';
//Services
import { PersonRoleService  } from '../../services/personRole.service';
import { ItemCategoryService } from '../../services/itemCategory.service';
import { RoleService } from '../../services/role.service';
import { PersonService  } from '../../services/person.service';

//Models
import { Person } from '../../models/person';
import { ItemCategory } from '../../models/itemCategory';
import { PersonRole } from '../../models/personRole';
import { Role } from '../../models/role';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-personRole',
  templateUrl: './personRole.component.html',
  styleUrls: ['./personRole.component.css']
})
export class PersonsroleComponent implements OnInit {

  listPersons: Person[] = [];
  listItemCategories: ItemCategory[] = [];
  listPersonRole: PersonRole[] = [];

  listRole: Role[] = [];
  personRoleForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private personRoleService: PersonRoleService ,
    private personService: PersonService,
    //private itemCategoryRolService: ItemCategoryRoleService,
    private itemCategoryService: ItemCategoryService,
    private roleService: RoleService,
  ) {
    this.personRoleForm = this.createFormGroup();
   }
   @ViewChild(MatPaginator) paginator: MatPaginator; 
  
  //Persons and Categories
  updateListPersons() {
    this.personService.getPersons().subscribe(person => {
      this.listPersons = person;
    });
  }
  updateListItemCategories() {
    this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
      this.listItemCategories = itemCategories;

    });
  }
  /*updateListItemCategories() {//OJO SERVICIO ANTERIOR
    this.itemCategoryRolService.getPersonsRole().subscribe(itemCategories => {
      this.listItemCategories = itemCategories;
    });
  }*/

  updateListRoles() {
    this.roleService.getRole().subscribe(role => {
      this.listRole = role;
    });
  }

  //All 
  updateListPersonRole() {
    this.personRoleService.getPersonRole().subscribe(personRole => {
      this.listPersonRole = personRole
      this.data= new MatTableDataSource<PersonRole>(this.listPersonRole);
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
  deletePersonRole(id: number) {
    this.personRoleService.deletePersonRole(id).subscribe(persons => {
      this.updateListPersonRole();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }

  updatePersonRole(id: number) {
    alert(JSON.stringify(this.personRoleForm.valueChanges));
  }

  ngOnInit() {
    this.updateListPersons();
    this.updateListItemCategories();
    this.updateListRoles();
    this.updateListPersonRole();
  }

  displayedColumns: string[] = ['university_career_id', 'role', 'person', 'delete', 'update'];

  createFormGroup() {
    return new FormGroup({
      person_role_id: new FormControl(),
      university_career_id: new FormControl('', [
        Validators.required,
      ]),
      role_id: new FormControl('', [
        Validators.required,
      ]),
      person_id: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  //Load data in form
  loadData(personRoleEdit: PersonRole) {
    this.personRoleForm.setValue({
      person_role_id: personRoleEdit.person_role_id,
      university_career_id: personRoleEdit.university_career_id,
      role_id : personRoleEdit.role_id,
      person_id: personRoleEdit.person_id,

    })
  }

  //submit form
  submitForm() {
    if (this.personRoleForm.value.person_role_id == null) {
      if (this.personRoleForm.valid) {
        this.personRoleService.createPersonRole(this.personRoleForm.value).subscribe(roleṔerson => {
          this.updateListPersonRole();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.personRoleForm.valid) {
        this.personRoleService.updatePersonRole(this.personRoleForm.value).subscribe(rolePerson => {
          this.updateListPersonRole();
        })
        this.resetForm();
      }
    }
  }

  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.personRoleForm.reset({ active: false });
    this.personRoleForm.markAsUntouched();
    Object.keys(this.personRoleForm.controls).forEach((nameControl) => {control = this.personRoleForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}
