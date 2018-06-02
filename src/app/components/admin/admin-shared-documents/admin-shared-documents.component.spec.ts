import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSharedDocumentsComponent } from './admin-shared-documents.component';

describe('AdminSharedDocumentsComponent', () => {
  let component: AdminSharedDocumentsComponent;
  let fixture: ComponentFixture<AdminSharedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSharedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSharedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
