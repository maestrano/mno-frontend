import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { AuthenticationService } from '../../_services'
import { User } from '../../_models'
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'mno-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
  @Input() header: string
  @Output() loggedIn = new EventEmitter<User>()

  public email = ''
  public password = ''
  public loading = false

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
    ).subscribe((u: User) => this.loggedIn.emit(u));
  }

  public onKeydown(event) {
    if (event.key === 'Enter') this.login()
  }
}
