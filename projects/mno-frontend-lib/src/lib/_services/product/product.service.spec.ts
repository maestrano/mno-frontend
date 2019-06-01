import { TestBed } from '@angular/core/testing'
import { JsonApiQueryData } from 'angular2-jsonapi'
import { of } from 'rxjs'

import { ProductService } from '../../_services'
import { DatastoreService } from '../datastore/datastore.service'
import { Product } from '../../_models/product/product'
import { itDefinesBehaviourSubjectAccessors, itMulticastsToObservers } from '../../../../testing/shared-examples'
import { ProductPricing } from '../../_models/product-pricing/product-pricing'
import { ProductValue } from '../../_models/product-value/product-value'
import { ProductValueField } from '../../_models'

describe('ProductService', () => {
  let product: Product
  let products: Product[]
  let service: ProductService
  let datastoreSpy: jasmine.SpyObj<DatastoreService>

  beforeEach(() => {
    product = new Product(datastoreSpy, { id: '1' })
    products = [product]

    datastoreSpy = jasmine.createSpyObj('DatastoreService', ['findAll'])
    datastoreSpy.findAll.and.returnValue(of(new JsonApiQueryData(products)))

    TestBed.configureTestingModule({
      providers: [
        { provide: DatastoreService, useValue: datastoreSpy },
        ProductService,
      ],
    })
    service = TestBed.get(ProductService)
  })

  itDefinesBehaviourSubjectAccessors(() => service, 'products', products)

  describe('fetchAll()', () => {
    beforeEach(() => {
      const value = new ProductValue(datastoreSpy, {
        attributes: { data: 'field data' }
      })
      value.field = new ProductValueField(datastoreSpy, {
        attributes: { nid: 'field_name' }
      })
      product.values = [value]
    })

    it('should fetch & emit products', () => {
      service.fetchAll().subscribe(res => {
        expect(res).toEqual(products)
        expect(res.length).toBe(1)
      })

      expect(datastoreSpy.findAll).toHaveBeenCalledWith(Product, {
        filter: { active: true },
        include: 'values.field,assets,product_instances.sync_status'
      })
    })

    it('should map Product Values / Fields to Products', () => {
      service.fetchAll().subscribe(res => expect(res[0]['field_name']).toEqual('field data'))
    })

    itMulticastsToObservers(() => service.fetchAll(), 2, (sub) => {
      service.products = [...products]
      sub.unsubscribe()
      service.products = [...products]
    })

    it('always fetches latest results', () => {
      service.fetchAll().subscribe()
      service.fetchAll().subscribe()
      expect(datastoreSpy.findAll).toHaveBeenCalledTimes(2)
    })
  })

  describe('getProductPricing(product: Product)', () => {
    beforeEach(() => {
      product.single_billing_enabled = true
      product.pricing_plans = [{ position: 2 }, { position: 1, id: '2' }]
    })

    it('create a ProductPricing from a ProductPricingPlan', () => {
      const pricing = service.getProductPricing(product)
      expect(pricing instanceof ProductPricing).toBe(true)
      expect(pricing.id).toEqual('2')
    })

    describe('when product single billing is disabled', () => {
      beforeEach(() => product.single_billing_enabled = false)
      it('returns undefined', () => {
        expect(service.getProductPricing(product)).toEqual(undefined)
      })
    })
  })
})
