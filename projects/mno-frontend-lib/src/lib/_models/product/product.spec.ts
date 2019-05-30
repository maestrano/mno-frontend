import { Product } from './product'
import { ProductAsset } from '../product-assets/product-assets'
import { itShouldBehaveLikeAJsonApiModel } from '../../../../testing/jsonapi-model-examples'
import { ProductInstance } from '../product-instance/product-instance'
import { ProductPricingPlan } from '../product-pricing-plan/product-pricing-plan'

describe('Product', () => {
  const type = 'products'
  const attributes = [
    'id',
    'uid',
    'nid',
    'name',
    'logo',
    'header_description',
    'description',
    'small_description',
    'tiny_description',
    'field_type',
    'pricing_plans',
    'key_benefits',
    'single_billing_enabled',
  ]
  const relationships = {
    product_instances: {
      data: [{ id: '1', type: 'product_instances' }]
    },
    values: {
      data: [{ id: '1', type: 'values' }]
    },
    assets: {
      data: [{ id: '1', type: 'assets' }]
    }
  }

  itShouldBehaveLikeAJsonApiModel(Product, { type, attributes, relationships }, (datastore) => {
    const product = new Product(datastore, { id: '1' })

    describe('get instance', () => {
      const instance = { id: '1' } as ProductInstance
      product.product_instances = [instance]

      it('returns the correct product instance', () => {
        expect(product.instance).toEqual(instance)
      })
    })

    describe('screenshots()', () => {
      const s1 = { field_name: 'Screenshot', position: 1 } as ProductAsset
      const s2 = { field_name: 'screenshot', position: 2 } as ProductAsset
      product.assets = [{ field_name: 'foo' }, s2, s1] as ProductAsset[]

      it('returns the screenshots ordered by position', () => {
        expect(product.screenshots()).toEqual([s1, s2])
      })
    })

    describe('pricingPlans()', () => {
      const p1 = { id: '1', position: 2 }
      const p2 = { id: '1', position: 1 }
      product.pricing_plans = [p1, p2]

      it('return the pricing plans sorted & instantiated as ProductPricingPlan\'s', () => {
        expect(product.pricingPlans()).toEqual([new ProductPricingPlan(p2), new ProductPricingPlan(p1)])
      })
    })

    describe('keyBenefits()', () => {
      it('returns the key benefits parsed JSON', () => {
        product.key_benefits = '["cool", "story", "mate"]'
        expect(product.keyBenefits()).toEqual(['cool', 'story', 'mate'])
      })
    })
  })
})
