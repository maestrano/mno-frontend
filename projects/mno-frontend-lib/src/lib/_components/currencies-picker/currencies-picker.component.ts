import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core'
import { FrontendLibConfigService, FrontendLibConfig } from '../../frontend-lib-config.service'

@Component({
  selector: 'mno-currencies-picker',
  templateUrl: './currencies-picker.component.html',
  styleUrls: ['./currencies-picker.component.scss']
})
export class CurrenciesPickerComponent implements OnInit {
  currencies: string[] = []
  @Input() currency: string
  @Output() selected = new EventEmitter<string>()

  constructor(@Inject(FrontendLibConfigService) private libConfig: FrontendLibConfig) { }

  ngOnInit() {
    this.currencies = this.libConfig.currency.supported
  }

  onChange(currency: string) {
    this.selected.emit(currency)
  }
}
