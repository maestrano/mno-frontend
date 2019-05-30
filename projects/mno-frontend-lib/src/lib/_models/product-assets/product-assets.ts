import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi'

@JsonApiModelConfig({
  type: 'assets'
})
export class ProductAsset extends JsonApiModel {
  @Attribute() field_name: string
  @Attribute() height: string
  @Attribute() position: number
  @Attribute() url: string
  @Attribute() width: string
}
