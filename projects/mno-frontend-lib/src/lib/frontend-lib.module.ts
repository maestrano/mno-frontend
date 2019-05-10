import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { FrontendLibConfigService, FrontendLibConfig } from './frontend-lib-config.service'
import { LoginBoxComponent } from './_components'
import { AuthenticationService, UserService } from './_services'

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
  ]
})
export class MnoFrontendLibModule {
  static forRoot(config: FrontendLibConfig): ModuleWithProviders {
    return {
      ngModule: MnoFrontendLibModule,
      providers: [
        AuthenticationService,
        UserService,
        {
          provide: FrontendLibConfigService,
          useValue: config
        }
      ]
    }
  }
}
