import { Resource } from 'ngx-jsonapi'
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
  tiny_description: string
  description: string
  field_type: string
  created_at: string
  updated_at: string
  values: ProductValue[]
  assets: ProductAsset[]
  pricing_plans: ProductPricingPlan[]

  constructor(attrs?: Partial<Product>) {
    super()
    Object.assign(this, attrs)
  }
}
