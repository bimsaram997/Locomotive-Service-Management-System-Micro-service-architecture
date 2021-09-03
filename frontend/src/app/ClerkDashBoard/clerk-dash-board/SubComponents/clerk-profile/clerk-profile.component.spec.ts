import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkProfileComponent } from './clerk-profile.component';

describe('ClerkProfileComponent', () => {
  let component: ClerkProfileComponent;
  let fixture: ComponentFixture<ClerkProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
