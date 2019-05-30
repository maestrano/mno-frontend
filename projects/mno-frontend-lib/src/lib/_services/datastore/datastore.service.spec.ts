import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http'
import { JsonApiDatastore } from 'angular2-jsonapi'
import { DatastoreService } from './datastore.service'
import {
  User,
  Organization,
  Subscription,
  Product,
  ProductInstance,
  ProductPricing,
  ProductValue,
  ProductValueField,
  ProductAsset,
  SyncStatus
} from '../../_models'

describe('DatastoreService', () => {
  let service: DatastoreService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient
      ]
    })

    service = TestBed.get(DatastoreService)
  })

  it('should be a JsonApiDatastore', () => {
    expect(service instanceof JsonApiDatastore)
  })

  it('should configure the JsonApiDatastore', () => {
    expect(service.datastoreConfig).toEqual({
      baseUrl: 'mnoe/jpi/v2',
      models: {
        users: User,
        organizations: Organization,
        subscriptions: Subscription,
        products: Product,
        product_instances: ProductInstance,
        product_pricings: ProductPricing,
        values: ProductValue,
        fields: ProductValueField,
        assets: ProductAsset,
        sync_statuses: SyncStatus,
      }
    })
  })
})
