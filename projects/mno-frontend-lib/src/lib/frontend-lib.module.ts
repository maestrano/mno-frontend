import * as _ from 'lodash'
import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { JsonApiModule } from 'angular2-jsonapi'
import { NgSelectModule } from '@ng-select/ng-select'

import { FrontendLibConfigService, FrontendLibConfig } from './frontend-lib-config.service'

import {
  AuthenticationService,
  UserService,
  ProductService,
  DashboardService
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
  LoadingSpinnerComponent,
  CardsCarouselComponent,
  AppsCarouselComponent,
  PopoverComponent,
  InfoBackdropModalComponent,
  OrganizationsPickerComponent,
  CurrenciesPickerComponent
} from './_components'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
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
    CardsCarouselComponent,
    AppsCarouselComponent,
    PopoverComponent,
    InfoBackdropModalComponent,
    OrganizationsPickerComponent,
    CurrenciesPickerComponent,
  ],
  exports: [
    LoginBoxComponent,
    ProductsComponent,
    ProductComponent,
    ExpandingTilesGridComponent,
    ModalComponent,
    ImageCarouselComponent,
    AddProductButtonComponent,
    LoadingSpinnerComponent,
    CardsCarouselComponent,
    AppsCarouselComponent,
    PopoverComponent,
    InfoBackdropModalComponent,
    OrganizationsPickerComponent,
    CurrenciesPickerComponent
  ],
  providers: [
    AuthenticationService,
    UserService,
    ProductService,
    DashboardService
  ]
})
export class MnoFrontendLibModule {
  static forRoot(config: FrontendLibConfig): ModuleWithProviders {
    const defaults = {
      urls: {
        products: {
          defaultPostConnectionRedirectPath: '/dashboard'
        }
      },
      products: {
        instancePollingInterval: 10000
      }
    }
    return {
      ngModule: MnoFrontendLibModule,
      providers: [
        {
          provide: FrontendLibConfigService,
          useValue: _.merge({}, config, defaults)
        }
      ]
    }
  }
}
