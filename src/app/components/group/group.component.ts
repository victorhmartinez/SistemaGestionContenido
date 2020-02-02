import { Component, OnInit , ViewChild} from '@angular/core';
import { Group } from 'src/app/models/group';
import { ItemCategory } from 'src/app/models/itemCategory'
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ItemCategoryService } from '../../services/itemCategory.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { GroupService } from 'src/app/services/group.service';
import { group } from '@angular/animations';

//Utils
import { UniversityCarrerService  } from 'src/app/services/university-carrer.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  listGroup: Group[] = [];
  listItemUniversityCareer: ItemCategory[] = [];
  GroupForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private GroupService: GroupService,
    private itemCategoryService: ItemCategoryService,
    private universityService : UniversityCarrerService
  ) {
    this.GroupForm = this.createFormGroup();
   }
   @ViewChild(MatPaginator) paginator: MatPaginator; 

   //List
   updateListItemUniversityCategories() {
    this.universityService.getUniversityCarrer().subscribe(itemCategories => {
      this.listItemUniversityCareer = itemCategories;
    });
  }

  //ALL
  updateListGroup(){
  this.GroupService.getGroup().subscribe(group => {
    this.listGroup = group;
    this.data= new MatTableDataSource<Group>(this.listGroup);
      this.data.paginator=this.paginator;
  },
    error => {
      alert(JSON.stringify(error));
    }
  );
}

deleteGroup(id: number) {
  this.GroupService.deleteGroup(id).subscribe(group => {
    this.updateListGroup();
  },
    error => {
      alert(JSON.stringify(error));
    })
  }

  updateGroup(id: number) {
    alert(JSON.stringify(this.GroupForm.valueChanges));
  }
  //Filter the table
  applyFilter(filterValue: string) {
  this.data.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.updateListItemUniversityCategories();
    this.updateListGroup();
  }

  displayedColumns: string[] = ['name', 'university_career_id', 'delete', 'update'];

  createFormGroup() {
    return new FormGroup({
      group_id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      university_career_id:  new FormControl('', [
        Validators.required,
        
      ]),
    });
  }

  //Load data in form
  loadData(GroupEdit: Group) {
    this.GroupForm.setValue({
      group_id: GroupEdit.group_id,
      name: GroupEdit.name,
      university_career_id: GroupEdit.university_career_id,   

    })
  }

  //submit form
  submitForm() {
    if (this.GroupForm.value.group_id == null) {
      if (this.GroupForm.valid) {
        this.GroupService.createGroup(this.GroupForm.value).subscribe(group => {
          this.updateListGroup();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.GroupForm.valid) {
        this.GroupService.updateGroup(this.GroupForm.value).subscribe(group => {
          this.updateListGroup();
        })
        this.resetForm();
      }
    }
  }
  //reset form
  resetForm() {
  let control: AbstractControl = null;
  this.GroupForm.reset({ active: false });
  this.GroupForm.markAsUntouched();
  Object.keys(this.GroupForm.controls).forEach((nameControl) => {control = this.GroupForm.controls[nameControl];
    control.setErrors(null);
  });
}
}
