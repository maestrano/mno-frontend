import { Injectable, Inject } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, switchMap } from 'rxjs/operators'
import { WINDOW } from 'ngx-window-token'
import { SubscriptionService } from '../subscription/subscription.service'
import { Product, Subscription, ProductInstance } from '../../_models'
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'
import { UserService } from '../user/user.service'
import { OrganizationService } from '../organization/organization.service'
import { ProductService } from '../product/product.service'

@Injectable({
  providedIn: 'root'
})
export class ProductProvisioningService {
  constructor(
    private userService: UserService,
    private organizationService: OrganizationService,
    private productService: ProductService,
    private subscriptionService: SubscriptionService,
    @Inject(FrontendLibConfigService) private libConfig: FrontendLibConfig,
    @Inject(WINDOW) private window: any
  ) {}

  public connect(product: Product): Observable<Subscription> {
    const user = this.userService.user
    return this.organizationService.fetchCurrentLatest().pipe(
      switchMap(organization => {
        const product_pricing = this.productService.getProductPricing(product)
        return this.subscriptionService.create({ product, user, organization, product_pricing }).pipe(
          tap(sub => this.redirectForConnection(sub.product_instance))
        )
      })
    )
  }

  public redirectForConnection(productInstance: ProductInstance, redirectPath?: string): void {
    const postConnRedirPath = redirectPath || this.libConfig.urls.products.defaultPostConnectionRedirectPath
    const url = this.libConfig.urls.products.connect.replace(':id', productInstance.uid)
    this.window.location.href = url.replace(':redirect_path', postConnRedirPath)
  }

  // Log user into app through SSO workflow, or visit app if already logged in
  public redirectToApp(productInstance: ProductInstance): void {
    const path = this.libConfig.urls.products.sso.replace(':id', productInstance.uid)
    this.window.open(path, '_blank')
  }
}
