import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core'

export interface PopoverOption {
  label: string
  value: string
}

@Component({
  selector: 'mno-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  open = false
  @Input() sticky = false
  @Input() disabled = false
  @Input() minWidth: string
  @Output() opened = new EventEmitter<boolean>()

  @ViewChild('ref') ref: ElementRef

  @HostListener('document:mousedown', ['$event']) onMousedownHandler(event: MouseEvent) {
    this.handleClick(event)
  }

  handleClick(e: MouseEvent) {
    if (this.ref && this.ref.nativeElement.contains(e.target)) return

    this.setOpen(false)
  }

  setOpen(val: boolean) {
    this.open = val
    this.opened.emit(val)
  }
}
