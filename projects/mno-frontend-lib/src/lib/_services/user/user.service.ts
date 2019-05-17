import { Injectable } from '@angular/core'
import { Service, Autoregister } from 'ngx-jsonapi'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap, switchMap, filter, take } from 'rxjs/operators'

import { User } from '../../_models'
import { AuthenticationService } from '../authentication/authentication.service'
import { OrganizationService } from '../organization/organization.service'

const RESOURCE_TYPE = 'users'

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class UserService extends Service<User> {
  public resource = User
  public type = RESOURCE_TYPE

  private _user = new BehaviorSubject<User>(null)
  private user$ = this._user.asObservable()

  constructor(
    private authenticationService: AuthenticationService,
    // Ngxjsonapi requires services injected somewhere to be register
    private _organizationService: OrganizationService
  ) {
    super()
  }

  public get user(): User {
    return this._user.getValue()
  }

  public set user(val: User) {
    this._user.next(val)
  }

  public fetch(): Observable<User> {
    if (this.user) return this.user$

    return this.requestUserDetails().pipe(
      tap(user => this.user = user),
      switchMap(() => this.user$)
    )
  }

  public fetchLatest(): Observable<User> {
    return this.fetch().pipe(take(1))
  }

  private requestUserDetails(): Observable<User> {
    return this.authenticationService.fetchCurrentUserId().pipe(
      switchMap(id => {
        if (!id) return of(null)
        const opts = { include: Array.from(User.includedRels) }
        return this.get(id, opts).pipe(filter(user => !user.is_loading))
      })
    )
  }
}
