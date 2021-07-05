import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditLocomotiveComponent } from './admin-edit-locomotive.component';

describe('AdminEditLocomotiveComponent', () => {
  let component: AdminEditLocomotiveComponent;
  let fixture: ComponentFixture<AdminEditLocomotiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditLocomotiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditLocomotiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
