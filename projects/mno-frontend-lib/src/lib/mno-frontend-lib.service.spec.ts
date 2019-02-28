import { TestBed } from '@angular/core/testing';

import { MnoFrontendLibService } from './mno-frontend-lib.service';

describe('MnoFrontendLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MnoFrontendLibService = TestBed.get(MnoFrontendLibService);
    expect(service).toBeTruthy();
  });
});
