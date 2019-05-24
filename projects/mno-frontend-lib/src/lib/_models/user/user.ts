import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi'
import { Organization } from '../organization/organization'

@JsonApiModelConfig({
  type: 'users'
})
export class User extends JsonApiModel {
  @Attribute() admin_role: string
  @Attribute() company: string
  @Attribute() email: string
  @Attribute() name: string
  @Attribute() surname: string
  @Attribute() phone: string
  @Attribute() phone_country_code: string
  @Attribute() sso_session: string

  @HasMany() organizations: Organization[]
}
