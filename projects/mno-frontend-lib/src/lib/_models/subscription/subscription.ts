import { JsonApiModel, JsonApiModelConfig, BelongsTo } from 'angular2-jsonapi'
import { Organization } from '../organization/organization'
import { Product } from '../product/product'
import { User } from '../user/user'
import { ProductInstance } from '../product-instance/product-instance'
import { ProductPricing } from '../product-pricing/product-pricing'

@JsonApiModelConfig({
  type: 'subscriptions'
})
export class Subscription extends JsonApiModel {
  @BelongsTo() organization: Organization
  @BelongsTo() product: Product
  @BelongsTo() user: User
  @BelongsTo() product_instance: ProductInstance
  @BelongsTo() product_pricing: ProductPricing
}
