import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi'

export type SyncStatuses = 'success' | 'error' | 'running' | 'enqueued' | 'disconnected'

@JsonApiModelConfig({
  type: 'sync_statuses'
})
export class SyncStatus extends JsonApiModel {
  @Attribute() status: SyncStatuses
  @Attribute() progress: number
  @Attribute() messages: string
  @Attribute() started_at: string
  @Attribute() finished_at: string
}
