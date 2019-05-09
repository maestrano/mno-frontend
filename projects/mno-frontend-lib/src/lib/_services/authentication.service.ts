import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from '../_models/user';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  public isLoggedOn(): Observable<boolean> {
    const url = 'mnoe/jpi/v1/current_user';
    return this.http.get(url, { headers: HEADERS }).pipe(
      catchError(() => of(false)),
      map((u: User) => u['current_user']['logged_in'])
    );
  }

  public login(email: string, password: string): Observable<User> {
    const url = 'mnoe/auth/users/sign_in';
    return this.http.post(url, { user: { email: email, password: password } }, { headers: HEADERS }).pipe(
      catchError(() => of(null))
    )
  }

  public logout() {
    const url = 'mnoe/auth/users/sign_out';
    return this.http.delete(url, { headers: HEADERS });
  }
}
