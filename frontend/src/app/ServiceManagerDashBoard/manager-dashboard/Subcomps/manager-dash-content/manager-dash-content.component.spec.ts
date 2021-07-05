import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashContentComponent } from './manager-dash-content.component';

describe('ManagerDashContentComponent', () => {
  let component: ManagerDashContentComponent;
  let fixture: ComponentFixture<ManagerDashContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDashContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDashContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
