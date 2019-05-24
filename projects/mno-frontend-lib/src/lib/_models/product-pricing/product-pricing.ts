import { JsonApiModelConfig, JsonApiModel } from 'angular2-jsonapi'

@JsonApiModelConfig({
  type: 'product_pricings'
})
// This model is used to init a ProductPricingPlan as a JsonApiModel
// allowing creation of relationships, etc, using angular2-jsonapi.
// See comments in product-pricing-plan.ts for more info.
export class ProductPricing extends JsonApiModel {}
