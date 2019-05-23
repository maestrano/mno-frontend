import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { Datastore } from '../../_services'
import { Subscription, Product, User, Organization } from '../../_models'

interface SubscriptionRelationships {
  product: Product
  user: User
  organization: Organization
  // pricing?: any
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private datastore: Datastore) {}

  public create(rels: SubscriptionRelationships): Observable<Subscription> {
    return this.datastore.createRecord(Subscription, rels).save().pipe(
      concatMap((sub) => this.datastore.findRecord(Subscription, sub.id, { include: 'product_instance' }))
    )
  }
}
