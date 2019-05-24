import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap, switchMap, map } from 'rxjs/operators'
import { ProductInstance } from '../../_models'
import { Datastore } from '../datastore/datastore.service'
import { UserService } from '../user/user.service'

@Injectable({
  providedIn: 'root'
})
export class ProductInstanceService {
  private _productInstances = new BehaviorSubject<ProductInstance[]>([])
  private productInstances$ = this._productInstances.asObservable()

  constructor(
    private datastore: Datastore,
    private userService: UserService
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
    // TODO: move currentOrganization to observable stream
    const currentOrg = this.userService.currentOrganization
    const options = { include: 'product,sync_status', filter: { organization_id: currentOrg.id } }
    return this.datastore.findAll(ProductInstance, options).pipe(
      map(response => response.getModels())
    )
  }
}
