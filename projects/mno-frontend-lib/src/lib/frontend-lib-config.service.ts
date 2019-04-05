import { InjectionToken } from '@angular/core';

export interface FrontendLibConfig {
  apiHost: {
    mnoe: string;
    impac: string;
  };
  apiRoot: {
    mnoeAuth: string;
    mnoeJpiV1: string;
    mnoeJpiV2: string;
    impacV2: string;
  };
}

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const FrontendLibConfigService = new InjectionToken<FrontendLibConfig>('FrontendLibConfig');
