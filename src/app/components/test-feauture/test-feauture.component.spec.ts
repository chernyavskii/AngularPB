import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFeautureComponent } from './test-feauture.component';

describe('TestFeautureComponent', () => {
  let component: TestFeautureComponent;
  let fixture: ComponentFixture<TestFeautureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFeautureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFeautureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
