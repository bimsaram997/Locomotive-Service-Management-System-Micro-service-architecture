import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MViewLocomotiveComponent } from './m-view-locomotive.component';

describe('MViewLocomotiveComponent', () => {
  let component: MViewLocomotiveComponent;
  let fixture: ComponentFixture<MViewLocomotiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MViewLocomotiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MViewLocomotiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
