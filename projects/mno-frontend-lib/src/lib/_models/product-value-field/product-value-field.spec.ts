import { ProductValueField } from './product-value-field'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'

describe('ProductValueField', () => {
  const type = 'fields'
  const attributes = [
    'nid',
    'name',
    'description',
    'field_type',
    'created_at',
    'updated_at',
    'position',
    'section',
    'visible',
  ]

  itShouldBehaveLikeAJsonApiModel(ProductValueField, { type, attributes })
})
