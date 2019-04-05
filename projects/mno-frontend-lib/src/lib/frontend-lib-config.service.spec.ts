import { TestBed } from '@angular/core/testing';

import { FrontendLibConfigService } from './frontend-lib-config.service';

describe('FrontendLibConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrontendLibConfigService = TestBed.get(FrontendLibConfigService);
    expect(service).toBeTruthy();
  });
});
