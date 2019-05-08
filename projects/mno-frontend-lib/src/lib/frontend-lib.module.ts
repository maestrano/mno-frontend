import { NgModule } from '@angular/core';
import { MnoFrontendLibComponent } from './frontend-lib.component';
import { ServicesModule } from './_services/services.module';

@NgModule({
  declarations: [
    MnoFrontendLibComponent
  ],
  imports: [
    ServicesModule
  ],
  exports: [
    MnoFrontendLibComponent
  ]
})
export class MnoFrontendLibModule { }
