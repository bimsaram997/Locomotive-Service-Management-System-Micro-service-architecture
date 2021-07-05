import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLocomotivesComponent } from './view-locomotives.component';

describe('ViewLocomotivesComponent', () => {
  let component: ViewLocomotivesComponent;
  let fixture: ComponentFixture<ViewLocomotivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLocomotivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLocomotivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
