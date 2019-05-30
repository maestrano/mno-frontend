import { JsonApiModel, BelongsTo, JsonApiModelConfig, Attribute } from 'angular2-jsonapi'
import { ProductValueField } from '../product-value-field/product-value-field'

@JsonApiModelConfig({
  type: 'values'
})
export class ProductValue extends JsonApiModel {
  @Attribute() data: string

  @BelongsTo() field: ProductValueField
}
