import { Dashboard } from './dashboard'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'

describe('Dashboard', () => {
  const type = 'dashboards'
  const attributes = [
    'name',
    'settings'
  ]

  itShouldBehaveLikeAJsonApiModel(Dashboard, { type, attributes })
})
