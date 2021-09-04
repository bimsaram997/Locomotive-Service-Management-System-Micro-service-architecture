import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkViewLocomotivesComponent } from './clerk-view-locomotives.component';

describe('ClerkViewLocomotivesComponent', () => {
  let component: ClerkViewLocomotivesComponent;
  let fixture: ComponentFixture<ClerkViewLocomotivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkViewLocomotivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkViewLocomotivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
