import { Component, Input, OnInit } from '@angular/core'
import * as _ from 'lodash'

@Component({
  selector: 'mno-product-key-benefits',
  templateUrl: './product-key-benefits.component.html',
  styleUrls: ['./product-key-benefits.component.scss']
})
export class ProductKeyBenefitsComponent implements OnInit {
  @Input() keyBenefits: string[] = []
  @Input() cols = 1

  public groups: string[][]

  ngOnInit() {
    if (this.cols > 1) this.groups = _.chunk(this.keyBenefits, this.cols)
  }
}
