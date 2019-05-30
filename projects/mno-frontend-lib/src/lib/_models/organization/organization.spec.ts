import { Organization } from './organization'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'

describe('Organization', () => {
  const type = 'organizations'
  const attributes = ['uid', 'name']

  itShouldBehaveLikeAJsonApiModel(Organization, { type, attributes })
})
