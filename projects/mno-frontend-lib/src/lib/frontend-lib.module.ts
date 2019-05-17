import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { FrontendLibConfigService, FrontendLibConfig } from './frontend-lib-config.service'
import {
  AuthenticationService,
  UserService,
  OrganizationService
} from './_services'
import { LoginBoxComponent } from './_components'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    LoginBoxComponent
  ],
  exports: [
    LoginBoxComponent
  ],
  providers: [
    UserService,
    AuthenticationService,
    OrganizationService
  ]
})
export class MnoFrontendLibModule {
  static forRoot(config: FrontendLibConfig): ModuleWithProviders {
    return {
      ngModule: MnoFrontendLibModule,
      providers: [
        {
          provide: FrontendLibConfigService,
          useValue: config
        }
      ]
    }
  }
}
