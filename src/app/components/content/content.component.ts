import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from 'src/app/models/person';
import { ItemCategory } from 'src/app/models/itemCategory';
import { ItemCategoryService } from '../../services/itemCategory.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
//import { UnirversityCareerService } from 'src/app/services/unirversity-career.service';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  
  listContentTypeEvent: ItemCategory[] = [];
  listAcademicPeriod: ItemCategory[] = [];
  listContent: Content[] = [];
  listItemUniversityCareer: ItemCategory[] = [];
  contentForm: FormGroup;
  data:MatTableDataSource<any>;
  constructor(
    private itemCategoryService: ItemCategoryService,
    private contentService : ContentService
  ) {
    this.contentForm = this.createFormGroup();
   }
   @ViewChild(MatPaginator) paginator: MatPaginator; 
       //Update UniversityCareer
       updateListItemUniversityCategories() {
        this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
          this.listItemUniversityCareer = itemCategories;
        });
      }
      //Update Type Event
      updateListContentTypeEvent() {
        this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
          this.listContentTypeEvent = itemCategories;
        });
      }
      //Update Academic Period
      updateListAcademicPeriod() {
        this.itemCategoryService.getItemCategories().subscribe(itemCategories => {
          this.listAcademicPeriod = itemCategories;
        });
      }
      //Update content
      updateListContent() {
        this.contentService.getContent().subscribe(content => {
          this.listContent = content
          this.data= new MatTableDataSource<Content>(this.listContent);
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
deleteContent(id: number) {
  this.contentService.deleteContent(id).subscribe(persons => {
    this.updateListContent();
  },
    error => {
      alert(JSON.stringify(error));
    })
}
//Update
updateContent(id: number) {
  alert(JSON.stringify(this.contentForm.valueChanges));
}
  ngOnInit() {
    this.updateListAcademicPeriod();
    this.updateListContent();
    this.updateListItemUniversityCategories();
    this.updateListContentTypeEvent();
  }
  //columns table
  displayedColumns: string[] = ['title','description','create_time','update_time','content_type_id','academic_period_id','university_career_id','delete','update'];
   //FORM ACTIONS
  //Create new form
  createFormGroup() {
    return new FormGroup({
      content_id: new FormControl(),
      title:new FormControl('', [
        Validators.required,
        Validators.maxLength(45)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      content_type_id: new FormControl('', [
        Validators.required,
      ]),     
      academic_period_id: new FormControl('', [
        Validators.required,
      ]),

      university_career_id: new FormControl('', [
        Validators.required,
      ]),
    });
    
  }
   //Load data in form
   loadData(contentEdit: Content) {
    this.contentForm.setValue({
      content_id:contentEdit.content_id,
      title: contentEdit.title,
      description: contentEdit.description,
      content_type_id: contentEdit.content_type_id,
      academic_period_id:contentEdit.academic_period_id,
      university_career_id  : contentEdit.university_career_id
    })
  }
    //submit form
    submitForm() {
      if (this.contentForm.value.content_id == null) {
        if (this.contentForm.valid) {
          this.contentService.createContent(this.contentForm.value).subscribe(content => {
            this.updateListContent();
          }, error => {
            alert(JSON.stringify(error));
          })
          this.resetForm();
        }
      }
      else {
        if (this.contentForm.valid) {
          this.contentService.updateContent(this.contentForm.value).subscribe(content => {
            this.updateListContent();
          })
          this.resetForm();
        }
      }
    }
     //reset forms
  resetForm() {
    let control: AbstractControl = null;
    this.contentForm.reset({ active: false });
    this.contentForm.markAsUntouched();
    Object.keys(this.contentForm.controls).forEach((nameControl) => {
      control = this.contentForm.controls[nameControl];
      control.setErrors(null);
    });
  }
}
