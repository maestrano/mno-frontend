import { Injectable } from '@angular/core'
import { Service, Autoregister } from 'ngx-jsonapi'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap, switchMap, filter, take } from 'rxjs/operators'

import { User } from '../../_models'
import { AuthenticationService } from '../authentication/authentication.service'
import { Cache, CacheService } from '../cache/cache.service'
import { OrganizationService } from '../organization/organization.service'

const RESOURCE_TYPE = 'users'

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class UserService extends Service<User> {
  public resource = User
  public type = RESOURCE_TYPE

  private user = new BehaviorSubject<User>(null)
  private user$ = this.user.asObservable()

  constructor(
    private authenticationService: AuthenticationService,
    private cacheService: CacheService,
    // Ngxjsonapi requires services injected somewhere to be register
    private _organizationService: OrganizationService) {
    super()
  }

  public resetCache() {
    this.cacheService.remove(RESOURCE_TYPE)
  }

  public fetch(): Observable<User> {
    if (this.user.value) return this.user$
    else return this.requestUserDetails().pipe(
      tap(user => this.user.next(user)),
      switchMap(() => this.user$)
    )
  }

  public fetchLatest(): Observable<User> {
    return this.fetch().pipe(take(1))
  }

  @Cache(RESOURCE_TYPE, { collection: false })
  private requestUserDetails(): Observable<User>
    return this.authenticationService.fetchCurrentUserId().pipe(
      switchMap(id => {
        if (!id) return of(null)
        const opts = { include: Array.from(User.includedRels) }
        return this.get(id, opts).pipe(filter(user => !user.is_loading))
      })
    )
  }
}
