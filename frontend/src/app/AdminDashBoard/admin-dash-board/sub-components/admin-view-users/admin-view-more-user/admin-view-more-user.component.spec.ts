import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewMoreUserComponent } from './admin-view-more-user.component';

describe('AdminViewMoreUserComponent', () => {
  let component: AdminViewMoreUserComponent;
  let fixture: ComponentFixture<AdminViewMoreUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewMoreUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewMoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
