import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgressReportComponent } from './view-progress-report.component';

describe('ViewProgressReportComponent', () => {
  let component: ViewProgressReportComponent;
  let fixture: ComponentFixture<ViewProgressReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProgressReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
