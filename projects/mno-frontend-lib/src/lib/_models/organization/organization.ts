import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi'

@JsonApiModelConfig({
  type: 'organizations'
})
export class Organization extends JsonApiModel {
  @Attribute() uid: string
  @Attribute() name: string
}
