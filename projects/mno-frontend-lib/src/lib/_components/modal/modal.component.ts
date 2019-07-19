import { Component, OnInit, OnDestroy, Output, EventEmitter, HostListener, Input } from '@angular/core'

@Component({
  selector: 'mno-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() width = '90%'
  @Input() height = '90%'
  @Output() closed = new EventEmitter<void>()

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closed.emit()
  }

  ngOnInit() {
    // Apply bootstrap .modal-open to body (like it does with its modal) to prevent
    // scrolling page underneath.
    document.body.classList.add('modal-open')
  }

  ngOnDestroy() {
    document.body.classList.remove('modal-open')
  }
}
