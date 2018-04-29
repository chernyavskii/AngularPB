import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgentComponent } from './dialog-agent.component';

describe('DialogAgentComponent', () => {
  let component: DialogAgentComponent;
  let fixture: ComponentFixture<DialogAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
