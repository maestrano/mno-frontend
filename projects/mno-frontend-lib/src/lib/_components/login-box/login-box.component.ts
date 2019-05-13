import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { AuthenticationService } from '../../_services'
import { User } from '../../_models'
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'mno-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
  @Input() header: string
  @Output() onLogin = new EventEmitter<User>()
  @Output() onSignup = new EventEmitter<boolean>()

  public email = ''
  public password = ''
  public company = ''
  public loading = false
  public signupEnabled = false

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public login() {
    this.loading = true
    this.auth.login(this.email, this.password).pipe(
      catchError((err) => {
        this.loading = false;
        return of(err);
      })
    ).subscribe((u: User) => this.onLogin.emit(u))
  }

  public signup() {
    this.loading = true
    this.auth.signup(this.company, this.email).pipe(
      finalize(() => this.loading = false)
    ).subscribe(() => this.onSignup.emit(true))
  }

  public onKeydown(event, action = 'login') {
    if (event.key != 'Enter') return
    switch(action) {
      case 'login': this.login()
      case 'signup': this.signup()
      default: return
    }
  }

  public toggleSignup(val: boolean) {
    this.signupEnabled = val
  }
}
