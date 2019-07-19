import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi'
import {
  User,
  Organization,
  Product,
  ProductInstance,
  ProductValue,
  ProductValueField,
  ProductAsset,
  ProductPricing,
  SyncStatus,
  Dashboard
} from '../../_models'
import { Subscription } from '../../_models/subscription/subscription'

const config: DatastoreConfig = {
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
    dashboards: Dashboard
  }
}

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class DatastoreService extends JsonApiDatastore {

  constructor(http: HttpClient) {
    super(http)
  }
}
