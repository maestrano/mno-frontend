import { Resource } from 'ngx-jsonapi'

export class Organization extends Resource {
  attributes: {
    uid: string
    name: string
  }
}
