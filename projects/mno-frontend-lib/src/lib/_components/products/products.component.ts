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

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.fetchAll().subscribe(products => {
      this.products = products.concat(products)
      console.log('products', this.products)
    })
  }

  public trackByProductId(_idx: number, product: Product) {
    return product.id
  }

  onSelect(product) {
    console.log('selected', product)
  }
}
