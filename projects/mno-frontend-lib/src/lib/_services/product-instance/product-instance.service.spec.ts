import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { JsonApiQueryData } from 'angular2-jsonapi'

import { ProductInstanceService } from './product-instance.service'
import { DatastoreService } from '../datastore/datastore.service'
import { ProductInstance, Organization } from '../../_models'
import { OrganizationService } from '../organization/organization.service'
import { itDefinesBehaviourSubjectAccessors, itMulticastsToObservers } from '../../../../testing/shared-examples'

describe('ProductInstanceService', () => {
  let service: ProductInstanceService
  let datastoreSpy: jasmine.SpyObj<DatastoreService>
  let orgServiceSpy: jasmine.SpyObj<OrganizationService>
  const instances = [
    new ProductInstance(datastoreSpy, { id: '1' }),
    new ProductInstance(datastoreSpy, { id: '2' })
  ]
  const org = new Organization(undefined, { id: '1' })

  beforeEach(() => {
    datastoreSpy = jasmine.createSpyObj('DatastoreService', ['findAll'])
    datastoreSpy.findAll.and.returnValue(of(new JsonApiQueryData(instances)))

    orgServiceSpy = jasmine.createSpyObj('OrganizationService', ['fetchCurrent'])
    orgServiceSpy.fetchCurrent.and.returnValue(of(org))

    TestBed.configureTestingModule({
      providers: [
        { provide: DatastoreService, useValue: datastoreSpy },
        { provide: OrganizationService, useValue: orgServiceSpy }
      ]
    })

    service = TestBed.get(ProductInstanceService)
  })

  itDefinesBehaviourSubjectAccessors(() => service, 'productInstances', instances)

  describe('fetchAll()', () => {
    it('should fetch & emit products', () => {
      service.fetchAll().subscribe(res => {
        expect(res).toEqual(instances)
        expect(res.length).toEqual(2)
      })

      expect(datastoreSpy.findAll).toHaveBeenCalledWith(ProductInstance, {
        include: 'product,sync_status',
        filter: { organization_id:  org.id}
      })
    })

    itMulticastsToObservers(() => service.fetchAll(), 2, (sub) => {
      service.productInstances = [...instances]
      sub.unsubscribe()
      service.productInstances = [...instances]
    })

    it('always fetches latest results', () => {
      service.fetchAll().subscribe()
      service.fetchAll().subscribe()
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(2)
    })
  })
})
