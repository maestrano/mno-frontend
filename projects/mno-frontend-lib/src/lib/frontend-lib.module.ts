import { NgModule } from '@angular/core';
import { LoginBoxComponent } from './_components/login-box/login-box.component';

@NgModule({
  declarations: [
    LoginBoxComponent
  ],
  exports: [
    LoginBoxComponent
  ]
})
export class MnoFrontendLibModule { }
