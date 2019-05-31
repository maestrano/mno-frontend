import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { of } from 'rxjs'
import { JsonApiQueryData } from 'angular2-jsonapi'

import {
  itDefinesBehaviourSubjectAccessors,
  itMulticastsToObservers,
  itNotifiesSubscriptionTimes
} from '../../../../testing/shared-examples'
import { ProductInstance, Organization, SyncStatus } from '../../_models'
import { ProductInstanceService } from './product-instance.service'
import { FrontendLibConfigService } from '../../frontend-lib-config.service'
import { DatastoreService } from '../datastore/datastore.service'
import { OrganizationService } from '../organization/organization.service'

describe('ProductInstanceService', () => {
  let service: ProductInstanceService
  let datastoreSpy: jasmine.SpyObj<DatastoreService>
  let orgServiceSpy: jasmine.SpyObj<OrganizationService>
  const org = new Organization(undefined, { id: '1' })
  const s1 = new SyncStatus(datastoreSpy, { id: '1', attributes: { status: 'connected' } })
  const s2 = new SyncStatus(datastoreSpy, { id: '2', attributes: { status: 'connected' } })
  const i1 = new ProductInstance(datastoreSpy, { id: '1' })
  const i2 = new ProductInstance(datastoreSpy, { id: '2' })
  let instances: ProductInstance[]

  const libConfigStub = {
    products: {
      instancePollingInterval: 10000
    }
  }

  beforeEach(() => {
    i1.sync_status = s1
    i2.sync_status = s2
    instances = [i1, i2]

    datastoreSpy = jasmine.createSpyObj('DatastoreService', ['findAll'])
    datastoreSpy.findAll.and.returnValue(of(new JsonApiQueryData(instances)))

    orgServiceSpy = jasmine.createSpyObj('OrganizationService', ['fetchCurrent'])
    orgServiceSpy.fetchCurrent.and.returnValue(of(org))

    TestBed.configureTestingModule({
      providers: [
        { provide: DatastoreService, useValue: datastoreSpy },
        { provide: OrganizationService, useValue: orgServiceSpy },
        { provide: FrontendLibConfigService, useValue: libConfigStub },
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

  describe('startPollingAll(interval: number)', () => {
    it('fetches instances at default interval', fakeAsync(() => {
      const sub = service.startPollingAll().subscribe(res => {
        expect(res).toEqual(instances)
      })
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(0)
      tick(0)
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(1)
      tick(libConfigStub.products.instancePollingInterval)
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(2)
      sub.unsubscribe()
    }))

    it('fetches instances at given interval', fakeAsync(() => {
      const sub = service.startPollingAll(500).subscribe()
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(0)
      tick(0)
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(1)
      tick(500)
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(2)
      sub.unsubscribe()
    }))

    describe('when there are no new instances or instance sync status changes', () => {
      itNotifiesSubscriptionTimes(() => service.startPollingAll(), 1, (sub) => {
        tick(0)
        tick(libConfigStub.products.instancePollingInterval)
        tick(libConfigStub.products.instancePollingInterval)
        sub.unsubscribe()
      })
    })

    describe('when there are new instances', () => {
      let newInstances

      beforeEach(() => {
        newInstances = instances.concat([], new ProductInstance(datastoreSpy, { id: '3' }))
      })

      itNotifiesSubscriptionTimes(() => service.startPollingAll(), 2, (sub) => {
        tick(0)
        datastoreSpy.findAll.and.returnValue(of(new JsonApiQueryData(newInstances)))
        tick(libConfigStub.products.instancePollingInterval)
        tick(libConfigStub.products.instancePollingInterval)
        sub.unsubscribe()
      })
    })

    describe('when there is an instance sync status change', () => {
      itNotifiesSubscriptionTimes(() => service.startPollingAll(), 2, (sub) => {
        tick(0)
        const updatedInstance = new ProductInstance(datastoreSpy, { id: '1' })
        updatedInstance.sync_status = new SyncStatus(datastoreSpy, { attributes: { status: 'disconnected' } })
        const updatedInstances = [updatedInstance, i2]
        datastoreSpy.findAll.and.returnValue(of(new JsonApiQueryData(updatedInstances)))
        tick(libConfigStub.products.instancePollingInterval)
        tick(libConfigStub.products.instancePollingInterval)
        sub.unsubscribe()
      })
    })
  })
})
