import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNextSchedulesComponent } from './view-next-schedules.component';

describe('ViewNextSchedulesComponent', () => {
  let component: ViewNextSchedulesComponent;
  let fixture: ComponentFixture<ViewNextSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNextSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNextSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
