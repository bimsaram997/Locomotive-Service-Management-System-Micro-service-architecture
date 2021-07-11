import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdloadProComponent } from './view-adload-pro.component';

describe('ViewAdloadProComponent', () => {
  let component: ViewAdloadProComponent;
  let fixture: ComponentFixture<ViewAdloadProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdloadProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdloadProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
