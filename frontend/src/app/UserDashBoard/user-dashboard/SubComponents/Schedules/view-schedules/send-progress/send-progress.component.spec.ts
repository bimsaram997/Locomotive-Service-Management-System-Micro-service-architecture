import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendProgressComponent } from './send-progress.component';

describe('SendProgressComponent', () => {
  let component: SendProgressComponent;
  let fixture: ComponentFixture<SendProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
