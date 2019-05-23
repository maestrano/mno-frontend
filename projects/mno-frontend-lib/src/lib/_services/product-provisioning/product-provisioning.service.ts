import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { SubscriptionService } from '../subscription/subscription.service'
import { Product, Subscription } from '../../_models'
import { UserService } from '../user/user.service'

@Injectable({
  providedIn: 'root'
})
export class ProductProvisioningService {
  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) { }

  public connect(product: Product): Observable<Subscription> {
    const user = this.userService.user
    const organization = this.userService.currentOrganization

    return this.subscriptionService.create({ product, user, organization })
  }
}
