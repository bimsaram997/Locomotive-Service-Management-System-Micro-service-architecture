import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreProgressComponent } from './view-more-progress.component';

describe('ViewMoreProgressComponent', () => {
  let component: ViewMoreProgressComponent;
  let fixture: ComponentFixture<ViewMoreProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
