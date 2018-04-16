import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentsComponent } from './admin-agents.component';

describe('AdminAgentsComponent', () => {
  let component: AdminAgentsComponent;
  let fixture: ComponentFixture<AdminAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
