import { Component, OnInit,  ViewChild } from '@angular/core';

//Services
import { UserCService } from '../../services/user-c.service';
import { PersonService } from '../../services/person.service';

//Models
import { Person } from '../../models/person';
import { UserC } from '../../models/userC';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-user-c',
  templateUrl: './user-c.component.html',
  styleUrls: ['./user-c.component.css']
})
export class UserCComponent implements OnInit {


  listUserC: UserC[] = [];
  listPerson: Person[] = [];
  userCForm: FormGroup;
  data:MatTableDataSource<any>;
  
  constructor(
    private personService: PersonService,
    private userCService: UserCService,
  ) { 
    this.userCForm = this.createFormGroup();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  updateListPerson() {
    this.personService.getPersons().subscribe(person => {
      this.listPerson = person;

    });
  }

  //All 
  updateListUserC() {
    this.userCService.getUserC().subscribe(userC => {
      this.listUserC = userC;
      this.data= new MatTableDataSource<UserC>(this.listUserC);
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
  deleteUserC(id: number) {
    this.userCService.deleteUserC(id).subscribe(userC => {
      this.updateListUserC();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }

  updateUserC(id: number) {
    alert(JSON.stringify(this.userCForm.valueChanges));
  }


  ngOnInit() {
    this.updateListUserC();
    this.updateListPerson();
  }

  displayedColumns: string[] = ['username', 'email', 'password', 'create_time', 'update_time','person_id', 'delete', 'update'];

  createFormGroup() {
    return new FormGroup({
      user_id: new FormControl(),
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(16)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(32)
      ]),
      person_id: new FormControl('', [
        Validators.required,
      ]), 
    });
  }

  //Load data in form
  loadData(userCEdit: UserC) {
    this.userCForm.setValue({
      user_id: userCEdit.user_id,
      username: userCEdit.username,
      email: userCEdit.email,
      password: userCEdit.password,
      person_id: userCEdit.person_id
      

    })
  }

  //submit form
  submitForm() {
    if (this.userCForm.value.user_id == null) {
      if (this.userCForm.valid) {
        this.userCService.createUserC(this.userCForm.value).subscribe(userC => {
          this.updateListUserC();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.userCForm.valid) {
        this.userCService.updateUserC(this.userCForm.value).subscribe(userC => {
          this.updateListUserC();
        })
        this.resetForm();
      }
    }
  }

  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.userCForm.reset({ active: false });
    this.userCForm.markAsUntouched();
    Object.keys(this.userCForm.controls).forEach((nameControl) => {control = this.userCForm.controls[nameControl];
      control.setErrors(null);
    });
  }

}