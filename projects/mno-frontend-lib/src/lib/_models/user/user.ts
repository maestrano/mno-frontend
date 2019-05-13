import { Resource, DocumentCollection } from 'ngx-jsonapi'
import { Organization } from '../../_models'

export class User extends Resource {
  public static readonly includedRels = Object.freeze(['organizations'])

  id: string
  // tslint:disable-next-line:variable-name
  logged_in: boolean
  attributes: {
    admin_role: string
    company: string
    email: string
    name: string
    surname: string
    phone: string
    phone_country_code: string
    sso_session: string
  }
  relationships = {
    organizations: new DocumentCollection<Organization>()
  }

  constructor(attrs?: Partial<User>) {
    super()
    Object.assign(this, attrs)
  }

  get organizations(): Organization[] {
    return this.relationships.organizations.data
  }
}
