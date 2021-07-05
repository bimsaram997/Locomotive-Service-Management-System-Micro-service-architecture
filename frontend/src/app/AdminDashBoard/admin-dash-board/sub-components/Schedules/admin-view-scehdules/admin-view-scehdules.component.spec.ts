import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewScehdulesComponent } from './admin-view-scehdules.component';

describe('AdminViewScehdulesComponent', () => {
  let component: AdminViewScehdulesComponent;
  let fixture: ComponentFixture<AdminViewScehdulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewScehdulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewScehdulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
