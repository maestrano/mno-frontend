import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ProductInstanceService } from '../../_services/product-instance/product-instance.service'
import { ProductInstance } from '../../_models'
import { ProductProvisioningService } from '../../_services/product-provisioning/product-provisioning.service'

interface App extends Partial<ProductInstance> {
  add?: boolean
}

@Component({
  selector: 'mno-apps-carousel',
  templateUrl: './apps-carousel.component.html',
  styleUrls: ['./apps-carousel.component.scss']
})
export class AppsCarouselComponent implements OnInit, OnDestroy {
  @Input() max = 4
  @Input() addAppNavigatePath: string

  public apps: App[] = []
  public indexStart = 0
  public loading = true

  private subs: Subscription[]

  constructor(
    private router: Router,
    private productInstanceService: ProductInstanceService,
    private productProvisioningService: ProductProvisioningService
  ) { }

  ngOnInit() {
    this.subs = [
      this.productInstanceService.startPollingAll().subscribe(instances => {
        this.apps = [...instances]
        this.apps.push({ add: true })
        this.loading = false
      })
    ]
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe())
  }

  public visibleCards(): App[] {
    return this.apps.slice(this.indexStart, this.indexStart + this.max)
  }

  public emptyCards(): any[] {
    const count = this.max - this.apps.length
    return new Array(count >= 0 ? count : 0)
  }

  public canShiftRight(): boolean {
    return (this.indexStart + this.max) < this.apps.length
  }

  public shiftRight() {
    if (this.canShiftRight()) this.indexStart++
  }

  public canShiftLeft(): boolean {
    return this.indexStart > 0
  }

  public shiftLeft() {
    if (this.canShiftLeft()) this.indexStart--
  }

  public onClick(app: App) {
    app.add ? this.router.navigate([this.addAppNavigatePath]) : this.productProvisioningService.redirectToApp(app as ProductInstance)
  }
}
