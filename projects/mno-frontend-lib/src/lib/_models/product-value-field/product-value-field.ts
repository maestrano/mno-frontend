import { JsonApiModel, BelongsTo, JsonApiModelConfig, Attribute } from 'angular2-jsonapi'
import { ProductValue } from '../product-value/product-value'

@JsonApiModelConfig({
  type: 'fields'
})
export class ProductValueField extends JsonApiModel {
  @Attribute() nid: string
  @Attribute() name: string
  @Attribute() description: string
  @Attribute() field_type: string
  @Attribute() created_at: string
  @Attribute() updated_at: string
  @Attribute() position?: number
  @Attribute() section?: string
  @Attribute() visible?: boolean

  @BelongsTo() value: ProductValue
}
