import { SyncStatus } from './sync-status'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'

describe('SyncStatus', () => {
  const type = 'sync_statuses'
  const attributes = [
    'status',
    'progress',
    'messages',
    'started_at',
    'finished_at',
  ]

  itShouldBehaveLikeAJsonApiModel(SyncStatus, { type, attributes })
})
