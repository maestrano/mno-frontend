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

  private user = new BehaviorSubject<User>(null)
  private user$ = this.user.asObservable()

  constructor(private authenticationService: AuthenticationService) {
    super()
  }

  public fetch(): Observable<User> {
    if (this.user.value) return this.user$
    else return this.requestUserDetails().pipe(
      tap(user => this.user.next(user)),
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
