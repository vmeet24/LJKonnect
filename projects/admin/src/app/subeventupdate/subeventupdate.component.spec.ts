import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventupdateComponent } from './subeventupdate.component';

describe('SubeventupdateComponent', () => {
  let component: SubeventupdateComponent;
  let fixture: ComponentFixture<SubeventupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubeventupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubeventupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
