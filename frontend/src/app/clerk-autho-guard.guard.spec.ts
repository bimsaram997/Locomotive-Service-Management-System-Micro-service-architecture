import { TestBed } from '@angular/core/testing';

import { ClerkAuthoGuardGuard } from './clerk-autho-guard.guard';

describe('ClerkAuthoGuardGuard', () => {
  let guard: ClerkAuthoGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClerkAuthoGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
