import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManLoadComponent } from './view-man-load.component';

describe('ViewManLoadComponent', () => {
  let component: ViewManLoadComponent;
  let fixture: ComponentFixture<ViewManLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewManLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewManLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
