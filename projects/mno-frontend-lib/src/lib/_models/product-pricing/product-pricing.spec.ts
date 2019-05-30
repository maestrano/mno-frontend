import { ProductPricing } from './product-pricing'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'

describe('ProductPricing', () => {
  const type = 'product_pricings'

  itShouldBehaveLikeAJsonApiModel(ProductPricing, { type })
})
