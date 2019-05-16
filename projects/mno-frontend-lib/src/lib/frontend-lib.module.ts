import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { FrontendLibConfigService, FrontendLibConfig } from './frontend-lib-config.service'

import {
  AuthenticationService,
  UserService,
  ProductService,
  JsonApiHelperService
} from './_services'

import {
  LoginBoxComponent,
  ProductComponent,
  ProductsComponent,
  ExpandingTilesGridComponent,
  ExpandingTileComponent,
  ModalComponent
} from './_components'

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
    ExpandingTilesGridComponent,
    ExpandingTileComponent,
    ModalComponent,
  ],
  exports: [
    LoginBoxComponent,
    ProductsComponent,
    ProductComponent,
    ExpandingTilesGridComponent,
    ModalComponent,
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
