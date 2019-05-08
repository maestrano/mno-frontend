import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from '../_models/user';

// TODO: pass as a parameter when lib is loaded
const MNOE_HOST = 'http://localhost:7000/mnoe';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  public isLoggedOn(): Observable<boolean> {
    const url = [MNOE_HOST, 'jpi/v1/current_user'].join('/');
    return this.http.get(url).pipe(
      catchError(() => of(false)),
      map((u: User) => !!u)
    );
  }

  public login(email: string, password: string): Observable<User> {
    const url = [MNOE_HOST, 'login_url?'].join('/');
    return this.http.post(url, { username: email, password: password }).pipe(
      catchError(() => of(null))
    )
  }
}
