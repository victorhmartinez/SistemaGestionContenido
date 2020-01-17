import { Component, OnInit,  ViewChild  } from '@angular/core';

//Services
import { EventService } from '../../services/event.service';
import { ContentService } from '../../services/content.service';

//Models
import { Content } from '../../models/content';
import { Event } from '../../models/event';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-envent',
  templateUrl: './envent.component.html',
  styleUrls: ['./envent.component.css']
})
export class EnventComponent implements OnInit {

  listEvent: Event[] = [];
  listContent: Content[] = [];
  eventForm: FormGroup;
  data:MatTableDataSource<any>;

  constructor(
    private eventService: EventService,
    private contentService: ContentService,
  ) {
    this.eventForm = this.createFormGroup();
   }

   @ViewChild(MatPaginator) paginator: MatPaginator; 

  updateListContent() {
    this.contentService.getContent().subscribe(content => {
      this.listContent = content;

    });
  }

  //All 
  updateListEvent() {
    this.eventService.getEvent().subscribe(event => {
      this.listEvent = event;
      this.data= new MatTableDataSource<Event>(this.listEvent);
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

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(event => {
      this.updateListEvent();
    },
      error => {
        alert(JSON.stringify(error));
      })

  }

  updateEvent(id: number) {
    alert(JSON.stringify(this.eventForm.valueChanges));
  }

  ngOnInit() {
    this.updateListEvent();
    this.updateListContent();
  }

  displayedColumns: string[] = [ 'date', 'place','link_form', 'url_info', 'content_id', 'delete', 'update'];


  createFormGroup() {
    return new FormGroup({
      event_id: new FormControl(), 
      place: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      link_form: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      url_info: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      content_id: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  //Load data in form
  loadData(eventEdit: Event) {
    this.eventForm.setValue({
      event_id: eventEdit.event_id,
      place: eventEdit.place,
      link_form: eventEdit.link_form,
      url_info: eventEdit.url_info,
      content_id: eventEdit.content_id,

    })
  }

  //submit form
  submitForm() {
    if (this.eventForm.value.event_id == null) {
      if (this.eventForm.valid) {
        this.eventService.createEvent(this.eventForm.value).subscribe(event => {
          this.updateListEvent();
        }, error => {
          alert(JSON.stringify(error));
        })
        this.resetForm();
      }
    }
    else {
      if (this.eventForm.valid) {
        this.eventService.updateEvent(this.eventForm.value).subscribe(event => {
          this.updateListEvent();
        })
        this.resetForm();
      }
    }
  }

  //reset form
  resetForm() {
    let control: AbstractControl = null;
    this.eventForm.reset({ active: false });
    this.eventForm.markAsUntouched();
    Object.keys(this.eventForm.controls).forEach((nameControl) => {control = this.eventForm.controls[nameControl];
      control.setErrors(null);
    });
  }

}
