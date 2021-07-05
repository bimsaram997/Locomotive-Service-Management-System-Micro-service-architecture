import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoginPageComponent } from './main-login-page.component';

describe('MainLoginPageComponent', () => {
  let component: MainLoginPageComponent;
  let fixture: ComponentFixture<MainLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
