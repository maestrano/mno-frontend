import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core'

@Component({
  selector: 'mno-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.scss']
})
export class CardsCarouselComponent implements OnInit, OnDestroy {
  @Input() max = 4
  @Input() items: any[] = []
  @Input() cardMinHeight: string
  @Input() cardStyles = {}
  @Output() clicked = new EventEmitter<any>()

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>

  public indexStart = 0
  public loading = true

  constructor() { }

  ngOnInit() {
    console.log(this.cardStyles)
  }

  ngOnDestroy() {
  }

  public visibleCards(): any[] {
    return this.items.slice(this.indexStart, this.indexStart + this.max)
  }

  public emptyCards(): any[] {
    const count = this.max - this.items.length
    return new Array(count >= 0 ? count : 0)
  }

  public canShiftRight(): boolean {
    return (this.indexStart + this.max) < this.items.length
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

@Input() onClick(item: any) {
    this.clicked.emit(item)
  }
}
