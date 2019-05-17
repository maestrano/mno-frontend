import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'

@Component({
  selector: 'mno-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss']
})
export class AddProductButtonComponent implements OnInit {
  public hasLaunchEvent = false

  @Input() connected = false
  @Input() connecting = false
  @Input() disconnected = false
  @Input() addText = 'Add'
  @Input() connectText = 'Connect'
  @Input() connectedText = 'Connected'
  @Output() clickedLaunch = new EventEmitter<void>()
  @Output() clickedAdd = new EventEmitter<void>()

  ngOnInit(): void {
    this.hasLaunchEvent = this.clickedLaunch.observers.length > 0
  }

  public getAddProductText(): string {
    return this.disconnected ? this.connectText : this.addText
  }

  public onClickAdd(event: Event) {
    event.stopPropagation()
    this.clickedAdd.emit()
  }

  public onClickLaunch(event: Event) {
    if (!this.connected || !this.hasLaunchEvent) return
    event.stopPropagation()
    this.clickedLaunch.emit()
  }
}
