import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap, switchMap, map, take } from 'rxjs/operators'
import { Organization, User } from '../../_models'
import { UserService } from '../user/user.service'

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private _organizations = new BehaviorSubject<Organization[]>([])
  private organizations$ = this._organizations.asObservable()

  constructor(private userService: UserService) { }

  public get organizations(): Organization[] {
    return this._organizations.getValue()
  }

  public set organizations(val: Organization[]) {
    this._organizations.next(val)
  }

  public fetchAll(): Observable<Organization[]> {
    if (this.organizations.length) return this.organizations$

    return this.requestAll().pipe(
      tap(orgs => this.organizations = orgs),
      switchMap(() => this.organizations$)
    )
  }

  public fetchCurrent(): Observable<Organization> {
    return this.fetchAll().pipe(map(orgs => orgs[0]))
  }

  public fetchCurrentLatest(): Observable<Organization> {
    return this.fetchCurrent().pipe(take(1))
  }

  private requestAll(): Observable<Organization[] | null> {
    return this.userService.fetchLatest().pipe(
      switchMap((user: User) => {
        return user ? of(user.organizations) : of(null)
      })
    )
  }
}
