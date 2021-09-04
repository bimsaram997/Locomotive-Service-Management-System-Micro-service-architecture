import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkLocoProfileComponent } from './clerk-loco-profile.component';

describe('ClerkLocoProfileComponent', () => {
  let component: ClerkLocoProfileComponent;
  let fixture: ComponentFixture<ClerkLocoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkLocoProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkLocoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
