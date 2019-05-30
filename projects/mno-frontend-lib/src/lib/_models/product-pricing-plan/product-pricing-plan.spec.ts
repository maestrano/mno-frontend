import { ProductPricingPlan } from './product-pricing-plan'

describe('ProductPricingPlan', () => {
  let model: ProductPricingPlan
  const prices = [{ currency: 'AUD', price_cents: 6000 }, { currency: 'USD', price_cents: 2000 }]

  beforeEach(() => {
    model = new ProductPricingPlan({ prices })
  })

  it('should create with attrs', () => {
    expect(model.prices).toEqual(prices)
  })
})
