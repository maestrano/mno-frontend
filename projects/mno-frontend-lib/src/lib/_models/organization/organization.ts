import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi'
import { User } from '../user/user'

@JsonApiModelConfig({
  type: 'organizations'
})
export class Organization extends JsonApiModel {
  @Attribute() uid: string
  @Attribute() name: string

  @BelongsTo() user: User
}
