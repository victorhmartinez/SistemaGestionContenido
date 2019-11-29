import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupContactComponent } from './groupContact.component';

describe('GroupContactComponent', () => {
  let component: GroupContactComponent;
  let fixture: ComponentFixture<GroupContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
