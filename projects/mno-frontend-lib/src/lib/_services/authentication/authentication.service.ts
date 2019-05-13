import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import * as _ from 'lodash'

import { User } from '../../_models'
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(FrontendLibConfigService) private libConfig: FrontendLibConfig,
    private http: HttpClient
  ) { }

  public isLoggedOn(): Observable<boolean> {
    return this.fetchCurrentUserId().pipe(map((id: string | null) => !!id))
  }

  public fetchCurrentUserId(): Observable<string | null> {
    const url = `${this.libConfig.urls.auth.currentUser}`
    return this.http.get(url, { headers: HEADERS }).pipe(
      map((res: { current_user: User }) => (_.get(res, 'current_user.logged_in') || null) && res.current_user.id),
      catchError(() => of(null))
    )
  }

  public login(email: string, password: string): Observable<User> {
    const url = `${this.libConfig.urls.auth.signIn}`
    return this.http.post(url, { user: { email, password } }, { headers: HEADERS }).pipe(
      map(resp => new User(resp))
    )
  }

  public logout(): Observable<{}> {
    const url = `${this.libConfig.urls.auth.signOut}`
    return this.http.delete(url, { headers: HEADERS })
  }
}
