import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManLoadProComponent } from './view-man-load-pro.component';

describe('ViewManLoadProComponent', () => {
  let component: ViewManLoadProComponent;
  let fixture: ComponentFixture<ViewManLoadProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewManLoadProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewManLoadProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
