import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMangerScheduleComponent } from './view-manger-schedule.component';

describe('ViewMangerScheduleComponent', () => {
  let component: ViewMangerScheduleComponent;
  let fixture: ComponentFixture<ViewMangerScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMangerScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMangerScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
