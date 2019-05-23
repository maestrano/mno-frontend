import { JsonApiModel, JsonApiModelConfig, BelongsTo } from 'angular2-jsonapi'
import { Organization } from '../organization/organization'
import { Product } from '../product/product'
import { User } from '../user/user'

@JsonApiModelConfig({
  type: 'subscriptions'
})
export class Subscription extends JsonApiModel {
  @BelongsTo() organization: Organization
  @BelongsTo() product: Product
  @BelongsTo() user: User
}
