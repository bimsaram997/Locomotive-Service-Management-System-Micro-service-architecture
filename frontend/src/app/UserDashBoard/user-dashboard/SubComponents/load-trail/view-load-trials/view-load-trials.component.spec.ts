import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoadTrialsComponent } from './view-load-trials.component';

describe('ViewLoadTrialsComponent', () => {
  let component: ViewLoadTrialsComponent;
  let fixture: ComponentFixture<ViewLoadTrialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoadTrialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoadTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
