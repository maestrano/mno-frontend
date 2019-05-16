import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Service, Autoregister } from 'ngx-jsonapi'
import { IDataCollection } from 'ngx-jsonapi/interfaces/data-collection'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, tap, switchMap } from 'rxjs/operators'

import { Product, ProductValue } from '../../_models'
import { JsonApiHelperService } from '../json-api-helper/json-api-helper.service'

const RESOURCE_TYPE = 'products'
const HEADERS = {
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json'
}

@Injectable()
@Autoregister()
export class ProductService extends Service<Product> {
  public resource = Product
  public type = RESOURCE_TYPE

  private _products = new BehaviorSubject<Product[]>([])
  private products$ = this._products.asObservable()

  readonly API_URL = 'mnoe/jpi/v2/products?filter[active]=true&include=values.field,assets'

  constructor(
    private http: HttpClient,
    private jsonApiHelperService: JsonApiHelperService,
  ) {
    super()
  }

  public get products(): Product[] {
    return this._products.getValue()
  }

  public set products(val: Product[]) {
    this._products.next(val)
  }

  public fetchAll(): Observable<Product[]> {
    if (this.products.length) return this.products$

    return this.requestAll().pipe(
      tap(products => this.products = products),
      switchMap(() => this.products$)
    )
  }

  public getProductByNid(nid: string): Observable<Product> {
    return this.requestAll().pipe(
      map(products => products.find(product => product.nid === nid))
    )
  }

  private requestAll(): Observable<Product[]> {
    // Query JsonApi direct as NgxJsonApi nested includes are not working
    return this.http.get(this.API_URL, { headers: HEADERS }).pipe(
      map((response: IDataCollection) => {
        return this.jsonApiHelperService.format(response).data.map(data => {
          return this.applyDynamicValues(data)
        })
      })
    )
  }

  private applyDynamicValues(product: Product): Product {
    product.values.forEach((value: ProductValue) => product[value.field.nid] = value.data)
    return new Product(product)
  }
}
