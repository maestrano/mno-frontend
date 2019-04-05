import { Injectable, Inject } from '@angular/core';
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service';


@Injectable()
export class MnoUserService {

  constructor(@Inject(FrontendLibConfigService) private config: FrontendLibConfig) {
    console.log('config provided to MnoUserService: ', config);
  }
}
