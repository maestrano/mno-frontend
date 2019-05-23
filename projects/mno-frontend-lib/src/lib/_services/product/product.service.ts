import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, tap, switchMap } from 'rxjs/operators'

import { Product, ProductValue } from '../../_models'
import { Datastore } from '../datastore/datastore.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products = new BehaviorSubject<Product[]>([])
  private products$ = this._products.asObservable()

  constructor(
    private datastore: Datastore,
  ) {}

  public get products(): Product[] {
    return this._products.getValue()
  }

  public set products(val: Product[]) {
    this._products.next(val)
  }

  public fetchAll() {
    if (this.products.length) return this.products$

    return this.requestAll().pipe(
      tap(products => this.products = products),
      switchMap(() => this.products$)
    )
  }

  private requestAll(): Observable<Product[]> {
    const options = { filter: { active: true }, include: 'values.field,assets' }
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
