import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedBacksComponent } from './view-feed-backs.component';

describe('ViewFeedBacksComponent', () => {
  let component: ViewFeedBacksComponent;
  let fixture: ComponentFixture<ViewFeedBacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFeedBacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedBacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
