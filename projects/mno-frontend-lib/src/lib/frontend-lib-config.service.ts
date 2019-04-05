import { InjectionToken } from '@angular/core';

export interface FrontendLibConfig {
  test: string;
}

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const FrontendLibConfigService = new InjectionToken<FrontendLibConfig>('FrontendLibConfig');
