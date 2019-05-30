import { Component, OnInit, Input, Inject } from '@angular/core'
import { ProductPricingPlan } from '../../_models'
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'

@Component({
  selector: 'mno-product-pricing-plans',
  templateUrl: './product-pricing-plans.component.html',
  styleUrls: ['./product-pricing-plans.component.scss']
})
export class ProductPricingPlansComponent implements OnInit {
  public appCurrency: string

  @Input() pricingPlans: ProductPricingPlan

  constructor(@Inject(FrontendLibConfigService) private libConfig: FrontendLibConfig) { }

  ngOnInit() {
    this.appCurrency = this.libConfig.currency
  }
}

