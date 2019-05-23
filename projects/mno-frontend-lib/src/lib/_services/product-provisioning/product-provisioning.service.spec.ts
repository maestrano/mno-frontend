import { TestBed } from '@angular/core/testing';

import { ProductProvisioningService } from './product-provisioning.service';

describe('ProductProvisioningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductProvisioningService = TestBed.get(ProductProvisioningService);
    expect(service).toBeTruthy();
  });
});
