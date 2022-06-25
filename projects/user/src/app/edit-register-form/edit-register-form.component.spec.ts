import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegisterFormComponent } from './edit-register-form.component';

describe('EditRegisterFormComponent', () => {
  let component: EditRegisterFormComponent;
  let fixture: ComponentFixture<EditRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
