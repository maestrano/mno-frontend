import { ProductAsset } from './product-assets'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'


describe('ProductAsset', () => {
  const type = 'assets'
  const attributes = [
    'field_name',
    'height',
    'position',
    'url',
    'width',
  ]

  itShouldBehaveLikeAJsonApiModel(ProductAsset, { type, attributes })
})
