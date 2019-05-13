import { Resource } from 'ngx-jsonapi'

export class Dashboard extends Resource {
  attributes: {
    name: string
    owner_type: string
    owner_id: string
    organization_ids: string[]
    settings: {
      currency: string
    }
  }

  constructor(attrs?: Partial<Dashboard>) {
    super()
    Object.assign(this, attrs)
  }
}
