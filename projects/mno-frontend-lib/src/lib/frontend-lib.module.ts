import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FrontendLibConfigService, FrontendLibConfig } from './frontend-lib-config.service';
import { LoginBoxComponent } from './_components/login-box/login-box.component';
import { AuthenticationService } from './_services/authentication/authentication.service';

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
export class MnoFrontendLibModule {
  static forRoot(config: FrontendLibConfig): ModuleWithProviders {
    return {
      ngModule: MnoFrontendLibModule,
      providers: [
        AuthenticationService,
        {
          provide: FrontendLibConfigService,
          useValue: config
        }
      ]
    };
  }
}
