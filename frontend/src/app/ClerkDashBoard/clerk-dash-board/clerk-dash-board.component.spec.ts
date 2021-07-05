import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkDashBoardComponent } from './clerk-dash-board.component';

describe('ClerkDashBoardComponent', () => {
  let component: ClerkDashBoardComponent;
  let fixture: ComponentFixture<ClerkDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
