import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkDashContentComponent } from './clerk-dash-content.component';

describe('ClerkDashContentComponent', () => {
  let component: ClerkDashContentComponent;
  let fixture: ComponentFixture<ClerkDashContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkDashContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkDashContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
