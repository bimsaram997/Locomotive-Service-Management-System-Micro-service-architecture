import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneMileageComponent } from './view-one-mileage.component';

describe('ViewOneMileageComponent', () => {
  let component: ViewOneMileageComponent;
  let fixture: ComponentFixture<ViewOneMileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneMileageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
