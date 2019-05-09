import { Resource } from 'ngx-jsonapi';

export class User extends Resource {
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
}