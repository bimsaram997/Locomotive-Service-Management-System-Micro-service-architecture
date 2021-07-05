import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReqScheduleComponent } from './edit-req-schedule.component';

describe('EditReqScheduleComponent', () => {
  let component: EditReqScheduleComponent;
  let fixture: ComponentFixture<EditReqScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReqScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReqScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
