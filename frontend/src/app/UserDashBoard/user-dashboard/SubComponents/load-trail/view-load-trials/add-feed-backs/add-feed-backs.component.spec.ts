import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedBacksComponent } from './add-feed-backs.component';

describe('AddFeedBacksComponent', () => {
  let component: AddFeedBacksComponent;
  let fixture: ComponentFixture<AddFeedBacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedBacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedBacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
