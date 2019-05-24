import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Datastore } from '../../_services/datastore/datastore.service'
import { Subscription, Product, User, Organization, ProductPricing } from '../../_models'

interface SubscriptionRelationships {
  product: Product
  user: User
  organization: Organization
  product_pricing?: ProductPricing
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private datastore: Datastore) {}

  public create(rels: SubscriptionRelationships): Observable<Subscription> {
    return this.datastore.createRecord(Subscription, rels).save().pipe(
      switchMap((sub) => this.datastore.findRecord(Subscription, sub.id, { include: 'product_instance' }))
    )
  }
}
