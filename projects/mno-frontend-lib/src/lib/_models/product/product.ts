import { Resource } from 'ngx-jsonapi'
import * as _ from 'lodash'

import { ProductValue } from '../product-value/product-value'
import { ProductAsset } from '../product-assets/product-assets'
import { ProductPricingPlan } from '../product-pricing-plan/product-pricing-plan'

export class Product extends Resource {
  // Attributes are defined on Products and it's relationships as they can be
  // mapped to plain objects (see ProductService#fetchAll).
  id: string
  uid: string
  nid: string
  name: string
  logo: string
  header_description: string
  description: string
  small_description: string
  tiny_description: string
  field_type: string
  created_at: string
  updated_at: string
  values: ProductValue[] = []
  assets: ProductAsset[] = []
  pricing_plans: ProductPricingPlan[] = []
  key_benefits: string[] | string
  horizontal_logo: ProductAsset
  screenshots: ProductAsset[] = []
  connecting?: boolean
  // instance?: ProductInstance

  constructor(attrs?: Partial<Product>) {
    super()
    // @todo parse methods below can be removed when product service nested includes is fixed
    if (attrs) {
      attrs.key_benefits = this.parseKeyBenefits(attrs.key_benefits as string)
      attrs.pricing_plans = this.parsePricingPlans(attrs.pricing_plans)
      attrs.assets = attrs.assets.map(a => new ProductAsset(a))
    }
    Object.assign(this, attrs)
    this.horizontal_logo = this.getHorizontalLogo()
    this.screenshots = this.getScreenshots()
  }

  public getHorizontalLogo(): ProductAsset {
    return this.assets.find(a => a.field_name.toLowerCase().includes('horizontal')) || new ProductAsset({ url: this.logo })
  }

  public getScreenshots(): ProductAsset[] {
    return _.sortBy(this.assets.filter(a => a.field_name.toLowerCase().includes('screenshot')), 'position')
  }

  private parsePricingPlans(pricingPlans: ProductPricingPlan[] = []): ProductPricingPlan[] {
    const pricings = pricingPlans.map(p => new ProductPricingPlan(p))
    if (!pricings) return pricings

    // Sort prices by position
    return pricings.sort((s1, s2) => s1.position - s2.position)
  }

  private parseKeyBenefits(keyBenefits: string): string[] {
    try {
      return JSON.parse(keyBenefits) || []
    } catch (error) {
      return []
    }
  }
}
