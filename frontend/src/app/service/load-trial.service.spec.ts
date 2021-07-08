import { TestBed } from '@angular/core/testing';

import { LoadTrialService } from './load-trial.service';

describe('LoadTrialService', () => {
  let service: LoadTrialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadTrialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
