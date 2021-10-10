import { TestBed } from '@angular/core/testing';

import { WeatherjsService } from './weatherjs.service';

describe('WeatherjsService', () => {
  let service: WeatherjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
