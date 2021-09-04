import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkViewSchedulesComponent } from './clerk-view-schedules.component';

describe('ClerkViewSchedulesComponent', () => {
  let component: ClerkViewSchedulesComponent;
  let fixture: ComponentFixture<ClerkViewSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkViewSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkViewSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
