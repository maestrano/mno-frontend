import { InjectionToken } from '@angular/core'

// When marking interface props as optional, make sure defaults are defined in
// the MnoFrontendLibModule.forRoot().
export interface FrontendLibConfig {
  currency: {
    default: string,
    supported: string[]
  },
  urls: {
    auth: {
      currentUser: string
      signIn: string
      signOut: string
      signUp: string
    },
    products: {
      defaultPostConnectionRedirectPath?: string
      connect: string
      disconnect: string
      sso: string
      syncAll: string
    }
  },
  products?: {
    instancePollingInterval?: number
  },
}

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const FrontendLibConfigService = new InjectionToken<FrontendLibConfig>('FrontendLibConfig')
