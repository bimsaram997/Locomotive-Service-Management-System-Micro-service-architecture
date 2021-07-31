import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordCommonComponent } from './reset-password-common.component';

describe('ResetPasswordCommonComponent', () => {
  let component: ResetPasswordCommonComponent;
  let fixture: ComponentFixture<ResetPasswordCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
