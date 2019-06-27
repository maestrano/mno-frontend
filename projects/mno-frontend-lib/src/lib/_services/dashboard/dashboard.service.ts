import { Injectable, Inject } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap, switchMap, map } from 'rxjs/operators'
import { Dashboard } from '../../_models'
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'
import { DatastoreService } from '../datastore/datastore.service'
import { UserService } from '../user/user.service'
import { OrganizationService } from '../organization/organization.service'

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
    private organizationService: OrganizationService,
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

  public create(params: DashboardCreateParams): Observable<Dashboard> {
    const user = this.userService.user
    return this.organizationService.fetchCurrent().pipe(
      switchMap(org => {
        const attrs = {
          owner: user,
          organization_ids: [org.uid],
          settings: { currency: this.libConfig.currency },
          ...params
        }
        return this.datastore.createRecord(Dashboard, attrs).save().pipe(
          tap(dashboard => this.add(dashboard))
        )
      })
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
