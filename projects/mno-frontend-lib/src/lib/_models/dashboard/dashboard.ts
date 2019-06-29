import { JsonApiModelConfig, JsonApiModel, Attribute } from 'angular2-jsonapi'

@JsonApiModelConfig({
  type: 'dashboards'
})
export class Dashboard extends JsonApiModel {
  // Parent application should set the gridOptions value on the Dashboard so dashboard instances
  // can use the values for positioning calculations.
  static gridOptions = {}

  @Attribute() name: string
  @Attribute() settings: { currency: string }
  @Attribute() owner_type: string
  @Attribute() owner_id: string
  @Attribute() organization_ids: string[]
}
