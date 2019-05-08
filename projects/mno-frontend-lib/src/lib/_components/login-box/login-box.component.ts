import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'mno-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
  public email = '';
  public password = '';

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public login() {
    this.auth.login(this.email, this.password).subscribe();
  }
}
