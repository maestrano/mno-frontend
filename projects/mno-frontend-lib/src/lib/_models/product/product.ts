import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany } from 'angular2-jsonapi'
import * as _ from 'lodash'

import { ProductValue } from '../product-value/product-value'
import { ProductAsset } from '../product-assets/product-assets'
import { ProductPricingPlan } from '../product-pricing-plan/product-pricing-plan'
import { ProductInstance } from '../product-instance/product-instance'

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
  @Attribute() single_billing_enabled: boolean

  @HasMany() product_instances: ProductInstance[] = []
  @HasMany() values: ProductValue[] = []
  @HasMany() assets: ProductAsset[] = []

  public connecting?: boolean
  private _screenshots: ProductAsset[] = []
  private _pricingPlans: ProductPricingPlan[]
  private _keyBenefits: string[]

  public get instance(): ProductInstance | undefined {
    return this.product_instances[0]
  }

  public screenshots(): ProductAsset[] {
    if (this._screenshots) return this._screenshots
    const screenshots = this.assets.filter(a => a.field_name.toLowerCase().includes('screenshot'))
    return this._screenshots = _.sortBy(screenshots, 'position')
  }

  public pricingPlans(): ProductPricingPlan[] {
    if (this._pricingPlans) return this._pricingPlans

    const pricings = this.pricing_plans.map(p => new ProductPricingPlan(p))
    return this._pricingPlans = pricings.sort((s1, s2) => s1.position - s2.position)
  }

  public keyBenefits(): string[] {
    if (this._keyBenefits && this._keyBenefits.length) return this._keyBenefits
    try {
      return this._keyBenefits = JSON.parse(this.key_benefits) || []
    } catch (error) {
      return []
    }
  }
}
