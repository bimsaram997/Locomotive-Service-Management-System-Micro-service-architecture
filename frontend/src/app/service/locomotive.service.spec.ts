import { TestBed } from '@angular/core/testing';

import { LocomotiveService } from './locomotive.service';

describe('LocomotiveService', () => {
  let service: LocomotiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocomotiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
