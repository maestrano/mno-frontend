import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi'

@JsonApiModelConfig({
  type: 'dashboards'
})
export class Dashboard extends JsonApiModel {
  @Attribute() name: string
  @Attribute() settings: { currency: string }
  @Attribute() owner_type: string
  @Attribute() owner_id: string
  @Attribute() organization_ids: string[]
}
