import { JsonApiModel, JsonApiModelConfig, BelongsTo, Attribute } from 'angular2-jsonapi'
import { SyncStatus, SyncStatuses } from '../sync-status/sync-status'

type ProductInstanceStatuses = 'pending' | 'provisioning' | 'active' | 'suspended' | 'cancelled'

@JsonApiModelConfig({
  type: 'product_instances'
})
export class ProductInstance extends JsonApiModel {
  private readonly SUCCESSFUL_SYNC_STATUS = 'success'
  private readonly RUNNING_SYNC_STATUSES = ['enqueued', 'running']
  private readonly DISCONNECTION_SYNC_STATUSES = ['error', 'disconnected']
  private readonly NO_SYNC_STATUS = 'disconnected'

  @Attribute() uid: string
  @Attribute() api_key: string
  @Attribute() api_secret: string
  @Attribute() external_id: string
  @Attribute() oauth_keys_valid: boolean
  @Attribute() organization_id: string
  @Attribute() status: ProductInstanceStatuses

  @BelongsTo() sync_status: SyncStatus

  public isConnected(): boolean {
    return this.DISCONNECTION_SYNC_STATUSES.indexOf(this.connectionStatus()) === -1
  }

  public isDisconnected(): boolean {
    return !this.isConnected()
  }

  private connectionStatus(): SyncStatuses {
    return this.sync_status ? this.sync_status.status : this.NO_SYNC_STATUS
  }
}
