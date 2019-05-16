export interface ProductPricingPlanPrice {
  currency: string
  price_cents: number
}

export class ProductPricingPlan {
  created_at: string
  description: string
  external_id: string
  free: boolean
  free_trial_duration: number
  free_trial_enabled: boolean
  free_trial_unit: string
  id: string
  language: string
  license_based: boolean
  name: string
  per_duration: string
  per_unit: string
  position: number
  prices: ProductPricingPlanPrice[]
  pricing_type: string
  product_id: string
  quote_based: boolean
  uid: string
  updated_at: string

  constructor(attrs?: Partial<ProductPricingPlan>) {
    Object.assign(this, attrs)
  }
}
