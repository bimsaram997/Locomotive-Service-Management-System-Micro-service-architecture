import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocomotiveComponent } from './create-locomotive.component';

describe('CreateLocomotiveComponent', () => {
  let component: CreateLocomotiveComponent;
  let fixture: ComponentFixture<CreateLocomotiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLocomotiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocomotiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
