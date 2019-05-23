import { JsonApiModel, JsonApiModelConfig, BelongsTo, Attribute } from 'angular2-jsonapi'
import { Product } from '../product/product'

@JsonApiModelConfig({
  type: 'assets'
})
export class ProductAsset extends JsonApiModel {
  @Attribute() field_name: string
  @Attribute() height: string
  @Attribute() position: number
  @Attribute() url: string
  @Attribute() width: string

  @BelongsTo() product: Product
}
