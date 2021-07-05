import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkHeaderComponent } from './clerk-header.component';

describe('ClerkHeaderComponent', () => {
  let component: ClerkHeaderComponent;
  let fixture: ComponentFixture<ClerkHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
