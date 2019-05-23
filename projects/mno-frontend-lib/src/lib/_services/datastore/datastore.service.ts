import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi'
import { Product, ProductValue, ProductValueField, ProductAsset, User, Organization } from '../../_models'

const config: DatastoreConfig = {
  baseUrl: 'mnoe/jpi/v2',
  models: {
    users: User,
    organizations: Organization,
    products: Product,
    values: ProductValue,
    fields: ProductValueField,
    assets: ProductAsset
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
