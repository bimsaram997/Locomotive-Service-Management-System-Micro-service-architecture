import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdLoadTrialComponent } from './view-ad-load-trial.component';

describe('ViewAdLoadTrialComponent', () => {
  let component: ViewAdLoadTrialComponent;
  let fixture: ComponentFixture<ViewAdLoadTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdLoadTrialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdLoadTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
