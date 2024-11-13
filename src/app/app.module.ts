import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxUiLoaderConfig,
  POSITION,
  SPINNER,
  NgxUiLoaderHttpConfig,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';
import { IconsProviderModule } from './icon-provider.module';
import { SharedModule } from './shared/modules/shared/shared.module';
import { LandingModule } from './modules/landing/landing.module';
import { CoreModule } from './core/core.module';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  // fgsType: SPINNER.chasingDots, // foreground spinner type
  // pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  // pbThickness: 5, // progress bar thickness
};

const ngxUiLoaderHttpConfig: NgxUiLoaderHttpConfig = {
  // showForeground: true,
};

registerLocaleData(en);

// const ngZorroConfig: NzConfig = {
//   notification: { nzPlacement: 'topRight' },
// };

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot(ngxUiLoaderHttpConfig),
    SharedModule,
    CoreModule,
    LandingModule,
    MessagesModule
  ],
  providers: [
    DatePipe,
    // { provide: NZ_I18N, useValue: en_US },
    // { provide: NZ_CONFIG, useValue: ngZorroConfig },
    TitleCasePipe,
    provideHttpClient(withInterceptorsFromDi()),
    MessageService
  ],
})
export class AppModule {}
