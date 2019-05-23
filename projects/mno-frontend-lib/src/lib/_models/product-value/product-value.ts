import { JsonApiModel, BelongsTo, JsonApiModelConfig, Attribute } from 'angular2-jsonapi'
import { Product } from '../product/product'
import { ProductValueField } from '../product-value-field/product-value-field'

@JsonApiModelConfig({
  type: 'values'
})
export class ProductValue extends JsonApiModel {
  @Attribute() data: string

  @BelongsTo() product: Product
  @BelongsTo() field: ProductValueField
}
