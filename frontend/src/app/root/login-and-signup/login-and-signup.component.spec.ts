import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndSignupComponent } from './login-and-signup.component';

describe('LoginAndSignupComponent', () => {
  let component: LoginAndSignupComponent;
  let fixture: ComponentFixture<LoginAndSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAndSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
