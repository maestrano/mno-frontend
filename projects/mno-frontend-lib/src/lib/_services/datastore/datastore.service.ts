import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi'
import { Product, ProductValue, ProductValueField, ProductAsset, User, Organization, ProductInstance, SyncStatus } from '../../_models'
import { Subscription } from '../../_models/subscription/subscription'

const config: DatastoreConfig = {
  baseUrl: 'mnoe/jpi/v2',
  models: {
    users: User,
    organizations: Organization,
    subscriptions: Subscription,
    products: Product,
    product_instances: ProductInstance,
    values: ProductValue,
    fields: ProductValueField,
    assets: ProductAsset,
    sync_statuses: SyncStatus
  }
}

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class Datastore extends JsonApiDatastore {

  constructor(http: HttpClient) {
    super(http)
  }
}
