import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkScheduleProfileComponent } from './clerk-schedule-profile.component';

describe('ClerkScheduleProfileComponent', () => {
  let component: ClerkScheduleProfileComponent;
  let fixture: ComponentFixture<ClerkScheduleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkScheduleProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkScheduleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
