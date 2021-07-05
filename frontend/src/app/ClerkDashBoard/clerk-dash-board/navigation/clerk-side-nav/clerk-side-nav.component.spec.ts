import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkSideNavComponent } from './clerk-side-nav.component';

describe('ClerkSideNavComponent', () => {
  let component: ClerkSideNavComponent;
  let fixture: ComponentFixture<ClerkSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
