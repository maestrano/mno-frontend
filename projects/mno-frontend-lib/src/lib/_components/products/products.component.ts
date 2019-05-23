import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../_services/product/product.service'
import { Product } from '../../_models'

@Component({
  selector: 'mno-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = []
  public loading = true

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.fetchAll().subscribe(products => {
      this.products = products
      this.loading = false
      console.log('products', products)
    })
  }

  public trackByProductId(_idx: number, product: Product) {
    return product.id
  }
}
