import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFinalMileageComponent } from './update-final-mileage.component';

describe('UpdateFinalMileageComponent', () => {
  let component: UpdateFinalMileageComponent;
  let fixture: ComponentFixture<UpdateFinalMileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFinalMileageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFinalMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
