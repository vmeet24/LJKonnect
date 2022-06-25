import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEventFormComponent } from './sub-event-form.component';

describe('SubEventFormComponent', () => {
  let component: SubEventFormComponent;
  let fixture: ComponentFixture<SubEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
