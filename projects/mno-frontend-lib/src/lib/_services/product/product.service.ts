import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, tap, switchMap } from 'rxjs/operators'

import { Product, ProductValue, ProductPricing } from '../../_models'
import { DatastoreService } from '../datastore/datastore.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products = new BehaviorSubject<Product[]>([])
  private products$ = this._products.asObservable()

  constructor(
    private datastore: DatastoreService
  ) {}

  public get products(): Product[] {
    return this._products.getValue()
  }

  public set products(val: Product[]) {
    this._products.next(val)
  }

  public fetchAll(): Observable<Product[]> {
    return this.requestAll().pipe(
      tap(products => this.products = products),
      switchMap(() => this.products$)
    )
  }

  // Get the first pricing plan for a product with `single_billing_enabled: true`,
  // then instantiate the ProductPricing JsonApiModel for creating the subscription rel.
  public getProductPricing(product: Product): ProductPricing | undefined {
    if (!product.single_billing_enabled) return
    const pricingPlan = product.pricingPlans().find(p => p.position === 1)
    return new ProductPricing(this.datastore, pricingPlan)
  }

  private requestAll(): Observable<Product[]> {
    const options = { filter: { active: true }, include: 'values.field,assets,product_instances.sync_status' }
    return this.datastore.findAll(Product, options).pipe(
      map(response => this.applyDynamicValues(response.getModels()))
    )
  }

  private applyDynamicValues(products: Product[]): Product[] {
    return products.map(product => {
      product.values.forEach((value: ProductValue) => product[value.field.nid] = value.data)
      return product
    })
  }
}
