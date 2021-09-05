import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClerkViewOneMileageComponent } from './clerk-view-one-mileage.component';

describe('ClerkViewOneMileageComponent', () => {
  let component: ClerkViewOneMileageComponent;
  let fixture: ComponentFixture<ClerkViewOneMileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClerkViewOneMileageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClerkViewOneMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
