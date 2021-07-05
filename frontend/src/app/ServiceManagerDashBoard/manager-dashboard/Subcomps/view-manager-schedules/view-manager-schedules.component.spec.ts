import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManagerSchedulesComponent } from './view-manager-schedules.component';

describe('ViewManagerSchedulesComponent', () => {
  let component: ViewManagerSchedulesComponent;
  let fixture: ComponentFixture<ViewManagerSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewManagerSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewManagerSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
