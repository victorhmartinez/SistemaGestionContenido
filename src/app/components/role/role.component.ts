import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  displayedColumns: string[] = [ 'name','delete', 'update'];
  listRole: Role[] = [];
  RoleForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private roleServices: RoleService

  ) {
    this.RoleForm = this.createFormGroup();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator; 

  updateListRole() {
    this.roleServices.getRole().subscribe(role => {
      this.listRole = role;
      this.data= new MatTableDataSource <Role>(this.listRole);
      this.data.paginator= this.paginator;
    })
  }

  //Filter the table
  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
  deleteRole(role_id: number) {
    this.roleServices.deleteRole(role_id).subscribe(role => {
      this.updateListRole();
    },
      error => {
        alert(JSON.stringify(error));
      })
   
  }

  ngOnInit() {
    this.updateListRole();

  }
  //FORM ACTIONS
  //Create new form
  createFormGroup() {
    return new FormGroup({
      role_id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
   
    });
  }

  //Load data in form
  loadData(roleEdit: Role) {
    this.RoleForm.setValue({
      role_id : roleEdit.role_id,
      name: roleEdit.name
      
    })
  }

  //submit form

  submitForm() {
    if (this.RoleForm.value.role_id == null) {
      if (this.RoleForm.valid) {
        this.roleServices.createRole(this.RoleForm.value).subscribe(role => {
          this.updateListRole();
        })
        this.resetForm();
      }
    }else{
      if (this.RoleForm.valid) {
        
        this.roleServices.updateRole(this.RoleForm.value).subscribe(role => {
          this.updateListRole();
        })
        this.resetForm();
      }
    }

    
  }

  //reset form
 
  resetForm() {
    let control: AbstractControl = null;
    this.RoleForm.reset({ active: false });
    this.RoleForm.markAsUntouched();
    Object.keys(this.RoleForm.controls).forEach((nameControl) => {
      control = this.RoleForm.controls[nameControl];
      control.setErrors(null);
      
    });
   
  }
}
