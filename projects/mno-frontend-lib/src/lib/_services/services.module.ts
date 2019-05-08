import { NgModule } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';

@NgModule({
  declarations: [
    AuthenticationServiceService
  ],
  exports: [
    AuthenticationServiceService
  ]
})
export class ServicesModule { }
