import { Component, OnInit,  ViewChild } from '@angular/core';

//Services
import { GroupEventService } from '../../services/groupEvent.service';
import { GroupService } from '../../services/group.service';
import { EventService } from '../../services/event.service';

//Models
import { Event } from '../../models/event';
import { Group } from '../../models/group';
import { GroupEvent } from '../../models/groupEvent';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-group-event',
  templateUrl: './group-event.component.html',
  styleUrls: ['./group-event.component.css']
})
export class GroupEventComponent implements OnInit {

  listGroup: Group[] = [];
  listEvent: Event[] = [];
  listGroupEvent: GroupEvent[] = [];
  groupEventForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private groupService: GroupService,
    private eventService: EventService,
    private groupEventService: GroupEventService,
  ) {
    this.groupEventForm = this.createFormGroup();
   }

   @ViewChild(MatPaginator) paginator: MatPaginator; 


   updateListGroup() {
     this.groupService.getGroup().subscribe(group => {
       this.listGroup = group;
 
     });
   }

   updateListEvent() {
    this.eventService.getEvent().subscribe(event => {
      this.listEvent = event;

    });
  }

  //All 
  updateListGroupEvent() {
    this.groupEventService.getGroupEvent().subscribe(groupEvent => {
      this.listGroupEvent = groupEvent;
      this.data= new MatTableDataSource<GroupEvent>(this.listGroupEvent);
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

  deleteGroupSection(id: number) {
    this.groupEventService.deleteGroupEvent(id).subscribe(groupEvent => {
      this.updateListGroupEvent();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }

  updateGroupSection(id: number) {
    alert(JSON.stringify(this.groupEventForm.valueChanges));
  }


  ngOnInit() {
    this.updateListGroup();
    this.updateListEvent();
    this.updateListGroupEvent();
  }

  displayedColumns: string[] = ['event_id', 'group_id', 'delete', 'update'];

  createFormGroup() {
    return new FormGroup({
      group_event_id: new FormControl(),
      event_id: new FormControl('', [
        Validators.required,
      ]), 
      group_id: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  //Load data in form
  loadData(groupEventEdit: GroupEvent) {
    this.groupEventForm.setValue({
      group_event_id: groupEventEdit.group_event_id,
      event_id: groupEventEdit.event_id,
      group_id: groupEventEdit.group_id     

    })
  }

  //submit form
  submitForm() {
    if (this.groupEventForm.value.section_id == null) {
      if (this.groupEventForm.valid) {
        this.groupEventService.createGroupEvent(this.groupEventForm.value).subscribe(groupEvent => {
          this.updateListGroupEvent();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.groupEventForm.valid) {
        this.groupEventService.updateGroupEvent(this.groupEventForm.value).subscribe(groupEvent => {
          this.updateListGroupEvent();
        })
        this.resetForm();
      }
    }
  }

  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.groupEventForm.reset({ active: false });
    this.groupEventForm.markAsUntouched();
    Object.keys(this.groupEventForm.controls).forEach((nameControl) => {control = this.groupEventForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}
