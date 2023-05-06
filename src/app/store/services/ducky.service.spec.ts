import { TestBed } from '@angular/core/testing';

import { DuckyService } from './ducky.service';

describe('DuckyService', () => {
  let service: DuckyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuckyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
