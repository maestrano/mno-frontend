import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core'

export interface PopoverOption {
  label: string
  value: string
}

@Component({
  selector: 'mno-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit, OnDestroy {
  open = false
  handleClick: (e: Event) => void
  // Whether to close dropdown on internal selection
  @Input() sticky = false
  @Output() opened = new EventEmitter<boolean>()

  @ViewChild('ref') ref: ElementRef

  constructor() {
    // To cancel the listener must save reference of bound function
    this.handleClick = ((e: Event) => {
      if (this.ref && this.ref.nativeElement.contains(e.target)) {
        return
      }
      this.setOpen(false)
    }).bind(this)
  }

  ngOnInit() {
    document.addEventListener('mousedown', this.handleClick)
  }

  ngOnDestroy() {
    document.removeEventListener('mousedown', this.handleClick)
  }

  setOpen(val: boolean) {
    this.open = val
    this.opened.emit(val)
  }
}
