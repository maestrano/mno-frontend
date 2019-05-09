import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from '../../_models/user';
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(FrontendLibConfigService) private libConfig: FrontendLibConfig, private http: HttpClient) {
    this.libConfig = libConfig;
  }

  public isLoggedOn(): Observable<boolean> {
    const url = `${this.libConfig.urls.auth.currentUser}`;
    return this.http.get(url, { headers: HEADERS }).pipe(
      catchError(() => of(false)),
      map((u: User) => u['current_user']['logged_in'])
    );
  }

  public login(email: string, password: string): Observable<User> {
    const url = `${this.libConfig.urls.auth.signIn}`;
    return this.http.post(url, { user: { email, password } }, { headers: HEADERS }).pipe(
      catchError(() => of(null))
    )
  }

  public logout() {
    const url = `${this.libConfig.urls.auth.signOut}`;
    return this.http.delete(url, { headers: HEADERS });
  }
}
