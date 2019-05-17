import { Component, Input } from '@angular/core'
import { Product } from '../../_models'


@Component({
  selector: 'mno-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product

  public isConnected() {}
  public isDisconnected() {}
  public connectProduct() {}
  public launchProduct() {}
}
