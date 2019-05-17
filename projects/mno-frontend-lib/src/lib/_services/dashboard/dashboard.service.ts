import { Injectable, Inject } from '@angular/core'
import { Service, Autoregister } from 'ngx-jsonapi'
import { BehaviorSubject, Observable } from 'rxjs'
import { concatMap, map, tap, filter } from 'rxjs/operators'
import * as _ from 'lodash'

import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'
import { Dashboard } from '../../_models'
import { UserService } from '../user/user.service'

const RESOURCE_TYPE = 'dashboards'

export interface DashboardCreateParams {
  name: string
  settings?: {
    currency?: string
  }
}

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class DashboardService extends Service<Dashboard> {
  public resource = Dashboard
  public type = RESOURCE_TYPE

  private _dashboards = new BehaviorSubject<Dashboard[]>([])
  private dashboards$ = this._dashboards.asObservable()

  constructor(
    @Inject(FrontendLibConfigService) private libConfig: FrontendLibConfig,
    private userService: UserService
  ) {
    super()
  }

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
      concatMap(() => this.dashboards$)
    )
  }

  public create(params: DashboardCreateParams): Observable<Dashboard> {
    params = { settings: { currency: this.libConfig.currency }, ...params }

    // hist_parameters is set null by default,
    // which is causing the API to save metadata[hist_parameters]=null
    // which is preventing us from saving metadata for the widgets later...
    // TODO: refactor old logic in mnohub
    delete (params['hist_parameters'])

    return this.userService.fetchLatest().pipe(
      concatMap(user => {
        const dashboard = this.new()
        dashboard.attributes = {
          owner_type: 'User',
          owner_id: user.id,
          organization_ids: _.compact([_.get(user, 'organizations[0].attributes.uid')]),
          ...(params as { name: string, settings: { currency: string } })
        }
        return dashboard.save().pipe(
          tap(() => this.add(dashboard)),
          map(() => dashboard)
        )
      })
    )
  }

  private requestAll(): Observable<Dashboard[]> {
    return this.userService.fetchLatest().pipe(
      concatMap(user => {
        return this.all({ remotefilter: { 'owner_id.in': user.id } }).pipe(
          filter(dashboards => !dashboards.is_loading),
          map(dashboards => dashboards.data),
        )
      })
    )
  }
}
