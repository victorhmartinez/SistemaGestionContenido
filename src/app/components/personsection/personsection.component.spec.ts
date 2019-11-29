import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsectionComponent } from './personsection.component';

describe('PersonsectionComponent', () => {
  let component: PersonsectionComponent;
  let fixture: ComponentFixture<PersonsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
