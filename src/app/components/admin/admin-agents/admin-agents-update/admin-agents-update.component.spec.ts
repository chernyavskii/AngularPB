import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgentsUpdateComponent } from './admin-agents-update.component';

describe('AdminAgentsUpdateComponent', () => {
  let component: AdminAgentsUpdateComponent;
  let fixture: ComponentFixture<AdminAgentsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAgentsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAgentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
