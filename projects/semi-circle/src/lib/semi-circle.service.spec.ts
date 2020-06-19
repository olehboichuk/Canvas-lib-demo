import { TestBed } from '@angular/core/testing';

import { SemiCircleService } from './semi-circle.service';

describe('SemiCircleService', () => {
  let service: SemiCircleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemiCircleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
