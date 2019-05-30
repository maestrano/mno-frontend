import { Subscription } from './subscription'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'


describe('Subscription', () => {
  const type = 'subscriptions'
  const relationships = {
    organization: {
      data: { id: '1', type: 'organizations' }
    },
    product: {
      data: { id: '1', type: 'products' }
    },
    user: {
      data: { id: '1', type: 'users' }
    },
    product_instance: {
      data: { id: '1', type: 'product_instances' }
    },
    product_pricing: {
      data: { id: '1', type: 'product_pricings' }
    }
  }

  itShouldBehaveLikeAJsonApiModel(Subscription, { type, relationships })
})
