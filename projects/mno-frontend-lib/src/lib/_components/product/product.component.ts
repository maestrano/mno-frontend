import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Product } from '../../_models'

@Component({
  selector: 'mno-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private productInstance: {}
  showModal = false

  @Input() product: Product
  @Output() selected = new EventEmitter<Product>()

  constructor() { }

  ngOnInit() {
    this.productInstance = {}
  }

  public onClickProduct() {
    this.selected.emit(this.product)
    this.showModal = !this.showModal
  }
}
