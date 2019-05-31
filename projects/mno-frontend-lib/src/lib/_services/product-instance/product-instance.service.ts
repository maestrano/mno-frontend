import { Injectable, Inject } from '@angular/core'
import { BehaviorSubject, Observable, timer } from 'rxjs'
import { tap, switchMap, map, filter, mergeMap } from 'rxjs/operators'
import * as _ from 'lodash'
import { ProductInstance } from '../../_models'
import { DatastoreService } from '../datastore/datastore.service'
import { OrganizationService } from '../organization/organization.service'
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'

@Injectable({
  providedIn: 'root'
})
export class ProductInstanceService {
  private _productInstances = new BehaviorSubject<ProductInstance[]>([])
  private productInstances$ = this._productInstances.asObservable()

  private readonly POLLING_INTERVAL: number

  constructor(
    private datastore: DatastoreService,
    private organizationService: OrganizationService,
    @Inject(FrontendLibConfigService) private libConfig: FrontendLibConfig
  ) {
    this.POLLING_INTERVAL = libConfig.products.instancePollingInterval
  }

  public get productInstances(): ProductInstance[] {
    return this._productInstances.getValue()
  }

  public set productInstances(val: ProductInstance[]) {
    this._productInstances.next(val)
  }

  public fetchAll(): Observable<ProductInstance[]> {
    return this.requestAll().pipe(
      tap(instances => this.productInstances = instances),
      switchMap(() => this.productInstances$)
    )
  }

  public startPollingAll(interval = this.POLLING_INTERVAL) {
    return timer(0, interval).pipe(
      switchMap(i => {
        // By-pass change detection for first request & just emit latest result
        return i < 1 ? this.fetchAll() : this.requestAll().pipe(
          filter(instances => this.detectInstanceChanges(instances)),
          tap(instances => this.productInstances = instances)
        )
      }),
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

  private detectInstanceChanges(latestInstances: ProductInstance[]): boolean {
    const pIns = this.productInstances
    return !pIns.length || latestInstances.length !== pIns.length || !_.isEmpty(
      // Returns an array of instances that failed the comparator function
      _.differenceWith(pIns, latestInstances, (i, li) => i.id === li.id && i.connectionStatus() === li.connectionStatus())
    )
  }
}
