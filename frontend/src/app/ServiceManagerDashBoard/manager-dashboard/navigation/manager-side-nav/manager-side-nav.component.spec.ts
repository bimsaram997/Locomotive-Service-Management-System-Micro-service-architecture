import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSideNavComponent } from './manager-side-nav.component';

describe('ManagerSideNavComponent', () => {
  let component: ManagerSideNavComponent;
  let fixture: ComponentFixture<ManagerSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
