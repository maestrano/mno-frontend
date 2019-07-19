import { TestBed } from '@angular/core/testing'

import { SubscriptionService } from './subscription.service'
import { DatastoreService } from '../datastore/datastore.service'
import { Subscription, Product, User, Organization, ProductPricing } from '../../_models'
import { of } from 'rxjs'
import { itFinalizesObservable } from 'projects/mno-frontend-lib/testing/shared-examples'

describe('SubscriptionService', () => {
  let datastoreSpy: jasmine.SpyObj<DatastoreService>
  let service: SubscriptionService
  const product = new Product(datastoreSpy, { id: '1' })
  const user = new User(datastoreSpy, { id: '1' })
  const organization = new Organization(datastoreSpy, { id: '1' })
  const product_pricing = new ProductPricing(datastoreSpy, { id: '1' })
  const unsavedSub = new Subscription(datastoreSpy)
  const sub = new Subscription(datastoreSpy, { id: '1' })

  beforeEach(() => {
    datastoreSpy = jasmine.createSpyObj('DatastoreService', ['createRecord', 'findRecord'])
    datastoreSpy.createRecord.and.returnValue(unsavedSub)
    spyOn(unsavedSub, 'save').and.returnValue(of(sub))
    datastoreSpy.findRecord.and.returnValue(of(sub))

    TestBed.configureTestingModule({
      providers: [
        { provide: DatastoreService, useValue: datastoreSpy }
      ]
    })

    service = TestBed.get(SubscriptionService)
  })

  describe('create(rels: SubscriptionRelationships)', () => {
    const rels = { product, user, organization, product_pricing }

    it('create a subscription', () => {
      service.create(rels).subscribe(res => {
        expect(res).toEqual(sub)
        expect(res.id).toEqual(sub.id)
      })

      expect(datastoreSpy.createRecord).toHaveBeenCalledWith(Subscription, rels)
      expect(datastoreSpy.findRecord).toHaveBeenCalledWith(Subscription, sub.id, {
        include: 'product_instance'
      })
    })

    itFinalizesObservable(() => service.create(rels))
  })
})
