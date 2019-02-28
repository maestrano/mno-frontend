import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MnoFrontendLibModule } from 'mno-frontend-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MnoFrontendLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
