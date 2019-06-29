import { Component, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'mno-info-backdrop-modal',
  templateUrl: './info-backdrop-modal.component.html',
  styleUrls: ['./info-backdrop-modal.component.scss']
})
export class InfoBackdropModalComponent {
  @Input() height: string
  @Input() width: string
  @Input() backdropColor: string
  @Output() closed = new EventEmitter<void>()

  onClosed() {
    this.closed.emit()
  }
}
