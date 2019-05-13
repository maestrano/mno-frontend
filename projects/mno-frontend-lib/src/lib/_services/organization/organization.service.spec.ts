import { TestBed } from '@angular/core/testing'
import { Service } from 'ngx-jsonapi'

import { OrganizationService } from './organization.service'
import { Organization } from '../../_models'

describe('OrganizationService', () => {
  let service: OrganizationService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationService]
    })
    service = TestBed.get(OrganizationService)
  })

  it('should be a NgxJsonApi Service', () => {
    expect(service instanceof Service).toBe(true)
    expect(service.resource).toEqual(Organization)
    expect(service.type).toEqual('organizations')
  })
})
