import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentLoadComponent } from './add-comment-load.component';

describe('AddCommentLoadComponent', () => {
  let component: AddCommentLoadComponent;
  let fixture: ComponentFixture<AddCommentLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
