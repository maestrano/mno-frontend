import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { NgxJsonapiModule, Service } from 'ngx-jsonapi'
import { of } from 'rxjs'

import { Product } from '../../_models'
import { ProductService, JsonApiHelperService, FormattedJsonApiResponse } from '../../_services'
import { getTestProducts } from '../../../../testing/product-data'

describe('ProductService', () => {
  let httpTestingController: HttpTestingController
  let jsonApiHelperServiceSpy: jasmine.SpyObj<JsonApiHelperService>
  let productService: ProductService
  const expectedApiUrl = 'mnoe/jpi/v2/products?filter[active]=true&include=values.field,assets'

  beforeEach(() => {
    jsonApiHelperServiceSpy = jasmine.createSpyObj('JsonApiHelperService', ['format'])
    jsonApiHelperServiceSpy.format.and.callFake(() => {
      return { data: getTestProducts() } as FormattedJsonApiResponse
    })

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxJsonapiModule.forRoot({
          url: 'mnoe/jpi/v2/'
        }),
      ],
      providers: [
        ProductService,
        { provide: JsonApiHelperService, useValue: jsonApiHelperServiceSpy }
      ],
    })

    httpTestingController = TestBed.get(HttpTestingController)
    productService = TestBed.get(ProductService)
  })

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify()
  })

  it('should be a NgxJsonApi Service', () => {
    expect(productService instanceof Service).toBe(true)
    expect(productService.resource).toEqual(Product)
    expect(productService.type).toEqual('products')
  })

  describe('fetchAll()', () => {
    const expectedProducts = getTestProducts().map(testProduct => {
      return Object.assign(testProduct, { field_name: 'field data' })
    })

    it('should fetch products from API and map Product Values / Fields to Product', () => {
      productService.fetchAll().subscribe(products => {
        expect(products).toEqual(expectedProducts)
        expect(products.length).toBe(2)
      })

      const req = httpTestingController.expectOne(expectedApiUrl)
      expect(req.request.method).toBe('GET')
      expect(req.request.headers.get('Accept')).toBe('application/vnd.api+json')
      expect(req.request.headers.get('Content-Type')).toBe('application/vnd.api+json')

      req.flush('some data')

      expect(jsonApiHelperServiceSpy.format).toHaveBeenCalledWith('some data')
    })
  })

  describe('getProductByNid(nid: string)', () => {

    it('should get product by NID', () => {
      let invoked = 0
      productService.getProductByNid('xero').subscribe(product => {
        expect(product.nid).toEqual('xero')
        invoked++
      })

      const req = httpTestingController.expectOne(expectedApiUrl)
      req.flush('some data')

      expect(invoked).toEqual(1)
    })
  })
})
