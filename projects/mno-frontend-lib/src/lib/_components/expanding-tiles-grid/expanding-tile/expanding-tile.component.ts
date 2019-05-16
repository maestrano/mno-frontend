import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'mno-expanding-tile',
  templateUrl: './expanding-tile.component.html',
  styleUrls: ['./expanding-tile.component.scss']
})
export class ExpandingTileComponent implements OnInit {

  public expanded = false

  ngOnInit() {
  }

  public expandItem() {
    this.expanded = !this.expanded
    // Apply bootstrap .modal-open to body (like it does with its modal) to prevent
    // scrolling page underneath.
    document.body.classList[this.expanded ? 'add' : 'remove']('modal-open')
  }
}
