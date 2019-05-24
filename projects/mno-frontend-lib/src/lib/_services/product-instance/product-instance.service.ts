import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap, switchMap, map } from 'rxjs/operators'
import { ProductInstance } from '../../_models'
import { Datastore } from '../datastore/datastore.service'
import { OrganizationService } from '../organization/organization.service'

@Injectable({
  providedIn: 'root'
})
export class ProductInstanceService {
  private _productInstances = new BehaviorSubject<ProductInstance[]>([])
  private productInstances$ = this._productInstances.asObservable()

  constructor(
    private datastore: Datastore,
    private organizationService: OrganizationService
  ) { }

  public get productInstances(): ProductInstance[] {
    return this._productInstances.getValue()
  }

  public set productInstances(val: ProductInstance[]) {
    this._productInstances.next(val)
  }

  public fetchAll(): Observable<ProductInstance[]> {
    return this.requestAll().pipe(
      tap(productInstances => this.productInstances = productInstances),
      switchMap(() => this.productInstances$)
    )
  }

  private requestAll(): Observable<ProductInstance[]> {
    return this.organizationService.fetchCurrent().pipe(
      switchMap(org => {
        const options = { include: 'product,sync_status', filter: { organization_id: org.id } }
        return this.datastore.findAll(ProductInstance, options).pipe(
          map(response => response.getModels())
        )
      })
    )
  }
}
