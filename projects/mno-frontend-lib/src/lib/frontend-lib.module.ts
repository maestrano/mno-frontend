import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginBoxComponent } from './_components/login-box/login-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginBoxComponent
  ],
  exports: [
    LoginBoxComponent
  ]
})
export class MnoFrontendLibModule { }
