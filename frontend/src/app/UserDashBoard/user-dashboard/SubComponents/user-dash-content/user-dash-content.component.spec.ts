import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashContentComponent } from './user-dash-content.component';

describe('UserDashContentComponent', () => {
  let component: UserDashContentComponent;
  let fixture: ComponentFixture<UserDashContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
