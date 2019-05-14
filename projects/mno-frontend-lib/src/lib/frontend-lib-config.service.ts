import { InjectionToken } from '@angular/core'

export interface FrontendLibConfig {
  currency: string
  urls: {
    auth: {
      currentUser: string
      signIn: string
      signOut: string
      signUp: string
    }
  }
}

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const FrontendLibConfigService = new InjectionToken<FrontendLibConfig>('FrontendLibConfig')
