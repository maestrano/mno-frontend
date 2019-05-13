import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { AuthenticationService } from '../../_services/authentication/authentication.service'
import { User } from '../../_models/user'

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
    this.auth.login(this.email, this.password).subscribe(
      (u: User) => {
        this.loggedIn.emit(u)
        this.loading = false
      }
    )
  }

  public onKeydown(event) {
    if (event.key === 'Enter') this.login()
  }
}
