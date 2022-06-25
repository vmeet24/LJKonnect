import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegisteredUserComponent } from './show-registered-user.component';

describe('ShowRegisteredUserComponent', () => {
  let component: ShowRegisteredUserComponent;
  let fixture: ComponentFixture<ShowRegisteredUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRegisteredUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRegisteredUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
