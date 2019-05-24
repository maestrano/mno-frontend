import { TestBed } from '@angular/core/testing';

import { ProductInstanceService } from './product-instance.service';

describe('ProductInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductInstanceService = TestBed.get(ProductInstanceService);
    expect(service).toBeTruthy();
  });
});
