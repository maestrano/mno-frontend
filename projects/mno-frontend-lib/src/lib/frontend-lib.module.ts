import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { FrontendLibConfigService, FrontendLibConfig } from './frontend-lib-config.service'
import { LoginBoxComponent, ProductComponent, ProductsComponent } from './_components'
import { AuthenticationService, UserService } from './_services'
import { ProductService } from './_services/product/product.service'
import { JsonApiHelperService } from './_services/json-api-helper/json-api-helper.service'
import { ExpandableGridComponent } from './_components/expandable-grid/expandable-grid/expandable-grid.component'
import { ExpandableItemComponent } from './_components/expandable-grid/expandable-item/expandable-item.component'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    LoginBoxComponent,
    ProductsComponent,
    ProductComponent,
    ExpandableGridComponent,
    ExpandableItemComponent
  ],
  exports: [
    LoginBoxComponent,
    ProductsComponent,
    ProductComponent,
    ExpandableGridComponent,
    ExpandableItemComponent,
  providers: [
    AuthenticationService,
    UserService,
    ProductService,
    JsonApiHelperService
  ]
})
export class MnoFrontendLibModule {
  static forRoot(config: FrontendLibConfig): ModuleWithProviders {
    return {
      ngModule: MnoFrontendLibModule,
      providers: [
        {
          provide: FrontendLibConfigService,
          useValue: config
        }
      ]
    }
  }
}
