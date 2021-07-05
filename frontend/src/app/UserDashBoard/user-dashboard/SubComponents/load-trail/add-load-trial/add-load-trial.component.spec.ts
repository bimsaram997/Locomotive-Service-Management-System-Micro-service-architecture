import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoadTrialComponent } from './add-load-trial.component';

describe('AddLoadTrialComponent', () => {
  let component: AddLoadTrialComponent;
  let fixture: ComponentFixture<AddLoadTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoadTrialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoadTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
