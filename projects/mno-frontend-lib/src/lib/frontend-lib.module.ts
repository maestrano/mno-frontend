import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { JsonApiModule } from 'angular2-jsonapi';

import { FrontendLibConfigService, FrontendLibConfig } from './frontend-lib-config.service'

import {
  AuthenticationService,
  UserService,
  ProductService,
} from './_services'

import {
  LoginBoxComponent,
  ProductComponent,
  ProductsComponent,
  ExpandingTilesGridComponent,
  ExpandingTileComponent,
  ModalComponent,
  ImageCarouselComponent,
  ProductKeyBenefitsComponent,
  ProductPricingPlansComponent,
  AddProductButtonComponent,
  LoadingSpinnerComponent
} from './_components'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    JsonApiModule
  ],
  declarations: [
    LoginBoxComponent,
    ProductsComponent,
    ProductComponent,
    ExpandingTilesGridComponent,
    ExpandingTileComponent,
    ModalComponent,
    ImageCarouselComponent,
    AddProductButtonComponent,
    LoadingSpinnerComponent,
    ProductKeyBenefitsComponent,
    ProductPricingPlansComponent,
  ],
  exports: [
    LoginBoxComponent,
    ProductsComponent,
    ProductComponent,
    ExpandingTilesGridComponent,
    ModalComponent,
    ImageCarouselComponent,
    AddProductButtonComponent,
    LoadingSpinnerComponent
  ],
  providers: [
    AuthenticationService,
    UserService,
    ProductService
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
