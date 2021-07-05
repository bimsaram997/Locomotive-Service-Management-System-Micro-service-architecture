import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMileageComponent } from './view-mileage.component';

describe('ViewMileageComponent', () => {
  let component: ViewMileageComponent;
  let fixture: ComponentFixture<ViewMileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMileageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
