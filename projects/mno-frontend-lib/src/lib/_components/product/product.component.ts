import { Component, Input } from '@angular/core'
import { Product } from '../../_models'
import { ProductProvisioningService } from '../../_services'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'mno-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product

  constructor(private productProvisioningService: ProductProvisioningService) {}

  public isConnected() {}

  public isDisconnected() {}

  public connectProduct() {
    this.product.connecting = true
    this.productProvisioningService.connect(this.product)
      .pipe(finalize(() => this.product.connecting = false))
      .subscribe()
  }

  public launchProduct() {}
}
