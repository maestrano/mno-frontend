import { Injectable } from '@angular/core'
import { Service, Autoregister } from 'ngx-jsonapi'
import { Organization } from '../../_models'

const RESOURCE_TYPE = 'organizations'

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class OrganizationService extends Service {
  public resource = Organization
  public type = RESOURCE_TYPE

  constructor() {
    super()
  }
}
