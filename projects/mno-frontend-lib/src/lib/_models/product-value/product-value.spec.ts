import { ProductValue } from './product-value'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'

describe('ProductValue', () => {
  const type = 'values'
  const attributes = ['data']
  const relationships = {
    field: {
      data: { id: '1', type: 'fields' }
    }
  }

  itShouldBehaveLikeAJsonApiModel(ProductValue, { type, attributes, relationships })
})
