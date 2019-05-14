import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mno-apps-carousel',
  templateUrl: './apps-carousel.component.html',
  styleUrls: ['./apps-carousel.component.css']
})
export class AppsCarouselComponent implements OnInit {
  @Input() max = 4

  public apps: object[]
  public indexStart = 0

  constructor() { }

  ngOnInit() {
    // TODO: fetch apps from service & show logos
    this.apps = [
      { attributes: { name: 'Xero' } },
      { attributes: { name: 'vTiger' } },
      { attributes: { name: 'Hubspot' } },
      { attributes: { name: 'Salesforce' } }
    ]
    // --
    this.apps.push({ add: true })
  }

  public visibleCards(): object[] {
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

}
