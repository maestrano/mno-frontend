import { Resource } from 'ngx-jsonapi'

export class User extends Resource {
  id: string
  // tslint:disable-next-line:variable-name
  logged_in: boolean
  attributes: {
    admin_role: string;
    company: string;
    email: string;
    name: string;
    phone: string;
    phone_country_code: string;
    sso_session: string;
    surname: string;
  }

  constructor(attrs?: Partial<User>) {
    super()
    Object.assign(this, attrs)
  }
}
