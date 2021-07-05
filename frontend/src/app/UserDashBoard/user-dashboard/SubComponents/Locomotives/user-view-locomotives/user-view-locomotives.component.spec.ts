import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewLocomotivesComponent } from './user-view-locomotives.component';

describe('UserViewLocomotivesComponent', () => {
  let component: UserViewLocomotivesComponent;
  let fixture: ComponentFixture<UserViewLocomotivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewLocomotivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewLocomotivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
