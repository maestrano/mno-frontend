import { JsonApiModel, JsonApiModelConfig, BelongsTo, Attribute } from 'angular2-jsonapi'

@JsonApiModelConfig({
  type: 'product_instances'
})
export class ProductInstance extends JsonApiModel {
  readonly SUCCESSFUL_SYNC_STATUS = 'success'
  readonly RUNNING_SYNC_STATUSES = ['enqueued', 'running']
  readonly DISCONNECTION_SYNC_STATUSES = ['error', 'disconnected']
  readonly NO_SYNC_STATUS = 'disconnected'

  @Attribute() uid: string
  @Attribute() api_key: string
  @Attribute() api_secret: string
  @Attribute() external_id: string
  @Attribute() oauth_keys_valid: boolean
  @Attribute() organization_id: string
  @Attribute() status: 'success' | 'enqueued' | 'running' | 'disconnected' | 'error'
}
