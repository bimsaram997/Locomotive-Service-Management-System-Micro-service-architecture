import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLocoProfileComponent } from './view-loco-profile.component';

describe('ViewLocoProfileComponent', () => {
  let component: ViewLocoProfileComponent;
  let fixture: ComponentFixture<ViewLocoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLocoProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLocoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
