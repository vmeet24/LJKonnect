import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventupdateComponent } from './eventupdate.component';

describe('EventupdateComponent', () => {
  let component: EventupdateComponent;
  let fixture: ComponentFixture<EventupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
