import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VermasMensajesComponent } from './vermas-mensajes.component';

describe('VermasMensajesComponent', () => {
  let component: VermasMensajesComponent;
  let fixture: ComponentFixture<VermasMensajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VermasMensajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VermasMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
