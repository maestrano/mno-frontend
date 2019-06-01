import { Injectable, Inject } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap, switchMap, map } from 'rxjs/operators'
import { Dashboard } from '../../_models'
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'
import { DatastoreService } from '../datastore/datastore.service'
import { UserService } from '../user/user.service'
import * as _ from 'lodash'

export interface DashboardCreateParams {
  name: string
  settings?: {
    currency?: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _dashboards = new BehaviorSubject<Dashboard[]>([])
  private dashboards$ = this._dashboards.asObservable()

  constructor(
    private datastore: DatastoreService,
    private userService: UserService,
    @Inject(FrontendLibConfigService) private libConfig: FrontendLibConfig,
  ) { }

  public get dashboards(): Dashboard[] {
    return this._dashboards.getValue()
  }

  public set dashboards(val: Dashboard[]) {
    this._dashboards.next(val)
  }

  public add(dashboard: Dashboard) {
    this.dashboards = this.dashboards.concat(dashboard)
  }

  public fetchAll(): Observable<Dashboard[]> {
    if (this.dashboards.length) return this.dashboards$

    return this.requestAll().pipe(
      tap(dashboards => this.dashboards = dashboards),
      switchMap(() => this.dashboards$)
    )
  }

  // TODO: unit test
  public create(params: DashboardCreateParams): Observable<Dashboard> {
    const user = this.userService.user
    params = {
      // TODO: use angular2-jsonapi relationship for owner.
      owner_type: 'User',
      owner_id: user.id,
      // TODO: use organization service fetchCurrent
      organization_ids: _.compact([_.get(user, 'organizations[0].uid')]),
      settings: { currency: this.libConfig.currency },
      ...params
    } as any // TODO: fix type
    return this.datastore.createRecord(Dashboard, params).save().pipe(
      tap(dashboard => this.add(dashboard))
    )
  }

  private requestAll(): Observable<Dashboard[]> {
    const user = this.userService.user
    const options = { filter: { 'owner_id.in': user.id } }
    return this.datastore.findAll(Dashboard, options).pipe(
      map(response => response.getModels())
    )
  }
}
