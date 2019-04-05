import { NgModule, ModuleWithProviders } from '@angular/core';
import { MnoFrontendLibComponent } from './frontend-lib.component';
import { FrontendLibConfigService, FrontendLibConfig } from './frontend-lib-config.service';
import { MnoUserService } from './services/index';

@NgModule({
  declarations: [MnoFrontendLibComponent],
  imports: [
  ],
  exports: [MnoFrontendLibComponent]
})
export class MnoFrontendLibModule {
  static forRoot(config: FrontendLibConfig): ModuleWithProviders {
    return {
      ngModule: MnoFrontendLibModule,
      providers: [
        MnoUserService,
        {
          provide: FrontendLibConfigService,
          useValue: config
        }
      ]
    };
  }
}
