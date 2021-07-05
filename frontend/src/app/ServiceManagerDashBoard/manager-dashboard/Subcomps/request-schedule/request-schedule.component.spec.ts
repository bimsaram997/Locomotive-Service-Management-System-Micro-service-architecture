import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestScheduleComponent } from './request-schedule.component';

describe('RequestScheduleComponent', () => {
  let component: RequestScheduleComponent;
  let fixture: ComponentFixture<RequestScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
