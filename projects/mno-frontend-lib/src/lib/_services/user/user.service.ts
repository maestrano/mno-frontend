import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap, switchMap, take } from 'rxjs/operators'

import { User } from '../../_models'
import { AuthenticationService } from '../authentication/authentication.service'
import { DatastoreService } from '../datastore/datastore.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new BehaviorSubject<User>(null)
  private user$ = this._user.asObservable()

  constructor(
    private datastore: DatastoreService,
    private authenticationService: AuthenticationService
  ) {}

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

  private requestUserDetails() {
    return this.authenticationService.fetchCurrentUserId().pipe(
      switchMap(id => id ? this.datastore.findRecord(User, id, { include: 'organizations' }) : of(null))
    )
  }
}
