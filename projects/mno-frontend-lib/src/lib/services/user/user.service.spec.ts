import { TestBed } from '@angular/core/testing';

import { MnoUserService } from './user.service';

describe('MnoUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MnoUserService = TestBed.get(MnoUserService);
    expect(service).toBeTruthy();
  });
});
