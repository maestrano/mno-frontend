import { Component, Input } from '@angular/core'

@Component({
  selector: 'mno-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'class': 'text-center loader-wrapper' }
})
export class LoadingSpinnerComponent {
  @Input() size: string
  @Input() vhCenter = true
}
