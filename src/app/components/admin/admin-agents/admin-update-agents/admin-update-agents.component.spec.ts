import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateAgentsComponent } from './admin-update-agents.component';

describe('AdminUpdateAgentsComponent', () => {
  let component: AdminUpdateAgentsComponent;
  let fixture: ComponentFixture<AdminUpdateAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUpdateAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
