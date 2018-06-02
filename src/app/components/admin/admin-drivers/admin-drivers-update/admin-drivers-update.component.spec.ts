import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDriversUpdateComponent } from './admin-drivers-update.component';

describe('AdminDriversUpdateComponent', () => {
  let component: AdminDriversUpdateComponent;
  let fixture: ComponentFixture<AdminDriversUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDriversUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDriversUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
