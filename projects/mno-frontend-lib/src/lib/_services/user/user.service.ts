import { Injectable } from '@angular/core'
import { Service, Autoregister } from 'ngx-jsonapi'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap, switchMap, filter } from 'rxjs/operators'

import { User } from '../../_models'
import { AuthenticationService } from '../authentication/authentication.service'

@Injectable({
  providedIn: 'root'
})
@Autoregister()
export class UserService extends Service<User> {
  public resource = User
  public type = 'users'

  private _user = new BehaviorSubject<User>(null)
  private user$ = this._user.asObservable()

  constructor(private authenticationService: AuthenticationService) {
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
    else return this.requestUserDetails().pipe(
      tap(user => this.user = user),
      switchMap(() => this.user$)
    )
  }

  private requestUserDetails(): Observable<User> {
    return this.authenticationService.fetchCurrentUserId().pipe(
      switchMap(id => {
        if (!id) return of(null)
        return this.get(id).pipe(filter(user => !user.is_loading))
      })
    )
  }
}
