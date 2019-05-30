import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core'
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

interface CarouselImage {
  url: string
}

@Component({
  selector: 'mno-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ImageCarouselComponent implements OnInit, AfterViewInit {

  @Input() images: CarouselImage[]
  @Input() disableNavigationArrows = false

  constructor(public carouselConfig: NgbCarouselConfig, private element: ElementRef) {
    Object.assign(this, { element })
    carouselConfig.interval = 0
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.manipulateNavigationArrows()
  }

  public identifyCarouselScreen(_index: number, image: CarouselImage) {
    return image.url
  }

  private manipulateNavigationArrows() {
    const nativeEl = this.element.nativeElement
    const controlPrev = nativeEl.querySelector('.carousel-control-prev')
    const controlNext = nativeEl.querySelector('.carousel-control-next')

    // Hide navigation arrows (no docs on this for v1.x, can't find API to hide in this version)
    if (this.disableNavigationArrows || !this.images || this.images.length < 2) {
      if (controlPrev) controlPrev.className += ' d-none'
      if (controlNext) controlNext.className += ' d-none'
      return
    }

    // Use fontawesome icon instead of default (default is an svg in the wrong color)
    const prevIcon = nativeEl.querySelector('.carousel-control-prev-icon')
    const nextIcon = nativeEl.querySelector('.carousel-control-next-icon')
    prevIcon.insertAdjacentHTML('beforeend', '<i class="fas fa-chevron-left"></i>')
    nextIcon.insertAdjacentHTML('beforeend', '<i class="fas fa-chevron-right"></i>')
  }
}
