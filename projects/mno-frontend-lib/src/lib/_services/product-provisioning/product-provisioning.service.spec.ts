import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { WINDOW } from 'ngx-window-token'

import { itFinalizesObservable } from '../../../../testing/shared-examples'
import { User, Product, Organization, ProductPricing, Subscription, ProductInstance } from '../../_models'
import { ProductProvisioningService } from './product-provisioning.service'
import { ProductService } from '../product/product.service'
import { UserService } from '../user/user.service'
import { OrganizationService } from '../organization/organization.service'
import { SubscriptionService } from '../subscription/subscription.service'
import { FrontendLibConfigService } from '../../frontend-lib-config.service'

describe('ProductProvisioningService', () => {
  const windowMock: { location: { href?: string }, open?: () => void } = { location: {}, open: () => { } }
  const libConfigStub = {
    urls: {
      products: {
        defaultPostConnectionRedirectPath: '/dashboard',
        connect: 'some/connect/path/:id?redirect=:redirect_path',
        sso: 'some/sso/path/:id'
      }
    }
  }
  let userServiceSpy: { user: User }
  let organizationServiceSpy: jasmine.SpyObj<OrganizationService>
  let productServiceSpy: jasmine.SpyObj<ProductService>
  let subscriptionServiceSpy: jasmine.SpyObj<SubscriptionService>
  let service: ProductProvisioningService

  const product = new Product(undefined, { id: '1' })
  const user = new User(undefined, { id: '1' })
  const organization = new Organization(undefined, { id: '1' })
  const productPricing = new ProductPricing(undefined, { id: '1' })
  const subscription = new Subscription(undefined, { id: '1 '})
  const instance = new ProductInstance(undefined, { id: '1', attributes: { uid: 'uid1' } })
  subscription.product_instance = instance

  beforeEach(() => {
    // Stubbing getter
    userServiceSpy = { user }

    organizationServiceSpy = jasmine.createSpyObj('OrganizationService', ['fetchCurrentLatest'])
    organizationServiceSpy.fetchCurrentLatest.and.returnValue(of(organization))

    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductPricing'])
    productServiceSpy.getProductPricing.and.returnValue(productPricing)

    subscriptionServiceSpy = jasmine.createSpyObj('SubscriptionService', ['create'])
    subscriptionServiceSpy.create.and.returnValue(of(subscription))

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: OrganizationService, useValue: organizationServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: SubscriptionService, useValue: subscriptionServiceSpy },
        { provide: FrontendLibConfigService, useValue: libConfigStub },
        { provide: WINDOW, useFactory: () => windowMock },
      ]
    })
    service = TestBed.get(ProductProvisioningService)
  })

  describe('connect(product: Product)', () => {
    beforeEach(() => spyOn(service, 'redirectForConnection'))

    it('should create a subscription and redirect for connection', () => {
      service.connect(product).subscribe()
      expect(organizationServiceSpy.fetchCurrentLatest).toHaveBeenCalled()
      expect(productServiceSpy.getProductPricing).toHaveBeenCalledWith(product)
      expect(subscriptionServiceSpy.create).toHaveBeenCalledWith({
        product, user, organization, product_pricing: productPricing
      })
      expect(service.redirectForConnection).toHaveBeenCalledWith(subscription.product_instance)
    })

    itFinalizesObservable(() => service.connect(product))
  })

  describe('redirectForConnection(productInstance: ProductInstance, redirectPath?: string)', () => {
    it('redirects browser for connection', () => {
      service.redirectForConnection(instance)
      expect(windowMock.location.href).toEqual(`some/connect/path/${instance.uid}?redirect=/dashboard`)
    })

    describe('with a configured redirectPath', () => {
      it('applys the configured post redirection redirect path', () => {
        service.redirectForConnection(instance, '/foo')
        expect(windowMock.location.href).toContain('redirect=/foo')
      })
    })
  })

  describe('redirectToApp(productInstance: ProductInstance)', () => {
    it('redirects browser to application', () => {
      spyOn(windowMock, 'open')
      service.redirectToApp(instance)
      expect(windowMock.open).toHaveBeenCalledWith(`some/sso/path/${instance.uid}`, '_blank')
    })
  })
})
