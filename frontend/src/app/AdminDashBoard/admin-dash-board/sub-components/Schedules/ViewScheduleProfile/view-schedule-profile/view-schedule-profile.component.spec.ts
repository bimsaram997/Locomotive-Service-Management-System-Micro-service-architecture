import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduleProfileComponent } from './view-schedule-profile.component';

describe('ViewScheduleProfileComponent', () => {
  let component: ViewScheduleProfileComponent;
  let fixture: ComponentFixture<ViewScheduleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScheduleProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScheduleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
