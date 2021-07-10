import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoadProfComponent } from './view-load-prof.component';

describe('ViewLoadProfComponent', () => {
  let component: ViewLoadProfComponent;
  let fixture: ComponentFixture<ViewLoadProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoadProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoadProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
