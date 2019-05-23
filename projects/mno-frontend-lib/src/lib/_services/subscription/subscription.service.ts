import { Injectable } from '@angular/core'
import { Datastore } from '../../_services'
import { Subscription, Product, User, Organization } from '../../_models'
import { Observable } from 'rxjs';

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
  constructor(private datastore: Datastore) { }

  public create(rels: SubscriptionRelationships): Observable<Subscription> {
    return this.datastore.createRecord(Subscription, rels).save()
    // TODO: return product instance for auth webhook redirection
  }
}
