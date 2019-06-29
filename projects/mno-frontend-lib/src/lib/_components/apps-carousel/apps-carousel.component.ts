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

  public onAppClick(app: App) {
    app.add ? this.router.navigate([this.addAppNavigatePath]) : this.productProvisioningService.redirectToApp(app as ProductInstance)
  }
}
