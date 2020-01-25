import { Component, OnInit, ViewChild } from '@angular/core';
//Services
import { GroupContactService  } from '../../services/groupContact.service';
import { ItemCategoryService } from '../../services/itemCategory.service';
import { GroupService } from '../../services/group.service';

//Models
import { GroupContact } from '../../models/groupContact';
import { ItemCategory } from '../../models/itemCategory';
import { Group } from '../../models/group';
import { UnirversityCareerService } from 'src/app/services/filerItemCategory';//ojooo
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-groupContact',
  templateUrl: './groupContact.component.html',
  styleUrls: ['./groupContact.component.css']
})
export class GroupContactComponent implements OnInit {
  listGroupContact: GroupContact[] = [];
  listContactType: ItemCategory[] = [];
  listGroup: Group[] = [];
  GroupContactForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private groupContactService: GroupContactService ,
    private groupService: GroupService,
    private itemCategoryService: ItemCategoryService


  ) {
    this.GroupContactForm = this.createFormGroup();
   }
   @ViewChild(MatPaginator) paginator: MatPaginator; 

  //
  updateListGroups() {
    this.groupService.getGroup().subscribe(group => {
      this.listGroup = group;
    });
  }

  //servicion otro
  updatelistContactType() {
    this.itemCategoryService.getItemCategories().subscribe(contactType => {
      this.listContactType = contactType;
    });
  }

  //All 
  updateListGroupContact() {
    this.groupContactService.getGroupContact().subscribe(groupContact => {
      this.listGroupContact = groupContact
      this.data= new MatTableDataSource<GroupContact>(this.listGroupContact);
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

  deleteGroupContact(id: number) {
    this.groupContactService.deleteGroupContact(id).subscribe(groupContact => {
      this.updateListGroupContact();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }

  updateGroupContact(id: number) {
    alert(JSON.stringify(this.GroupContactForm.valueChanges));
  }
  ngOnInit() {
    this.updateListGroups();
    this.updatelistContactType();
    this.updateListGroupContact();
  }

  displayedColumns: string[] = ['contact', 'contact_type_id', 'group_id', 'delete', 'update'];

  createFormGroup() {
    return new FormGroup({
      group_contact_id: new FormControl(),
      contact: new FormControl('', [
        Validators.required,
      ]),
      contact_type_id: new FormControl('', [
        Validators.required,
      ]),
      group_id: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  //Load data in form
  loadData(groupContactEdit: GroupContact) {
    this.GroupContactForm.setValue({
      group_contact_id: groupContactEdit.group_contact_id,
      contact: groupContactEdit.contact,
      contact_type_id : groupContactEdit.contact_type_id,
      group_id: groupContactEdit.group_id,

    })
  }

  //submit form
  submitForm() {
    if (this.GroupContactForm.value.group_contact_id == null) {
      if (this.GroupContactForm.valid) {
        this.groupContactService.createGroupContact(this.GroupContactForm.value).subscribe(groupContact => {
          this.updateListGroupContact();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.GroupContactForm.valid) {
        this.groupContactService.updateGroupContact(this.GroupContactForm.value).subscribe(groupContact => {
          this.updateListGroupContact();
        })
        this.resetForm();
      }
    }
  }
  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.GroupContactForm.reset({ active: false });
    this.GroupContactForm.markAsUntouched();
    Object.keys(this.GroupContactForm.controls).forEach((nameControl) => {control = this.GroupContactForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}
