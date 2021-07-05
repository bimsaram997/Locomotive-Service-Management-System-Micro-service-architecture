import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreSchedulesComponent } from './view-more-schedules.component';

describe('ViewMoreSchedulesComponent', () => {
  let component: ViewMoreSchedulesComponent;
  let fixture: ComponentFixture<ViewMoreSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
