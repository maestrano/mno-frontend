import * as _ from 'lodash'

import { ProductValue } from '../product-value/product-value'
import { ProductAsset } from '../product-assets/product-assets'
import { ProductPricingPlan } from '../product-pricing-plan/product-pricing-plan'
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany } from 'angular2-jsonapi'

@JsonApiModelConfig({
  type: 'products'
})
export class Product extends JsonApiModel {
  @Attribute() id: string
  @Attribute() uid: string
  @Attribute() nid: string
  @Attribute() name: string
  @Attribute() logo: string
  @Attribute() header_description: string
  @Attribute() description: string
  @Attribute() small_description: string
  @Attribute() tiny_description: string
  @Attribute() field_type: string
  @Attribute() pricing_plans: ProductPricingPlan[]
  @Attribute() key_benefits: string

  @HasMany() values: ProductValue[]
  @HasMany() assets: ProductAsset[]

  connecting?: boolean
  // instance?: ProductInstance

  public get screenshots(): ProductAsset[] {
    if (!this.assets) return []
    return _.sortBy(this.assets.filter(a => a.field_name.toLowerCase().includes('screenshot')), 'position')
  }

  public get pricingPlans(): ProductPricingPlan[] {
    const pricings = this.pricing_plans.map(p => new ProductPricingPlan(p))
    if (!pricings) return pricings

    return pricings.sort((s1, s2) => s1.position - s2.position)
  }

  public get keyBenefits() {
    try {
      return JSON.parse(this.key_benefits) || []
    } catch (error) {
      return []
    }
  }
}
