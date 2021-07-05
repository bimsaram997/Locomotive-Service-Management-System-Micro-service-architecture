import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMileagesComponent } from './view-mileages.component';

describe('ViewMileagesComponent', () => {
  let component: ViewMileagesComponent;
  let fixture: ComponentFixture<ViewMileagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMileagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMileagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
