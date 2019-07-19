import { AfterViewInit } from '@angular/core'
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'mno-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.scss']
})
export class CardsCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  public indexStart = 0
  public loading = true

  private _max = 4
  private _internalMax: number
  private resizeSubject = new Subject<number>()
  private resizeObservable = this.resizeSubject.asObservable().pipe(debounceTime(500))

  @Input() items: any[] = []
  @Input() cardMinHeight: string
  @Input() cardStyles = {}
  @Output() clicked = new EventEmitter<any>()

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>
  @ViewChild('cardsRef') cardsRef: ElementRef

  get max(): number {
    return this._internalMax || this._max
  }

  @Input('max')
  set max(value: number) {
    this._max = value
  }

  @Input() onClick(item: any) {
    this.clicked.emit(item)
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.resizeSubject.next(width)
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this._max = this.max
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateMaxCards()
      this.resizeObservable.subscribe(() => this.calculateMaxCards())
    })
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

  // Determine maximum cards that can be rendered.
  private calculateMaxCards() {
    const maxWidth = this.el.nativeElement.offsetWidth
    const cards = this.cardsRef.nativeElement.children
    const cardWidth = cards[0].offsetWidth + 25 // buffer for card spacing & prev / next actions

    // reduce maximum cards
    if (maxWidth / cardWidth < cards.length) {
      let i = this._max
      while (i <= this._max && i >= 1) {
        if (maxWidth / cardWidth > i) {
          this._internalMax = i
          break
        }
        i--
      }
    // increase maximum cards
    } else {
      let i = this._internalMax
      while (i <= this._max) {
        if (maxWidth / cardWidth >= i) {
          this._internalMax = i
        }
        i++
      }
    }
  }
}
