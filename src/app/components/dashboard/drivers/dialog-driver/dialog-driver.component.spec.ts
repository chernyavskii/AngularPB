import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDriverComponent } from './dialog-driver.component';

describe('DialogDriverComponent', () => {
  let component: DialogDriverComponent;
  let fixture: ComponentFixture<DialogDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
