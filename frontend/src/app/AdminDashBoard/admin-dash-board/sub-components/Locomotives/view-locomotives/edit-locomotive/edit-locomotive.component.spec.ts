import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocomotiveComponent } from './edit-locomotive.component';

describe('EditLocomotiveComponent', () => {
  let component: EditLocomotiveComponent;
  let fixture: ComponentFixture<EditLocomotiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLocomotiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocomotiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
