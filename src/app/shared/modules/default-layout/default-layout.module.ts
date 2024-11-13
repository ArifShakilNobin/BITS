import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DefaultLayoutRoutes } from './default-layout.routing';
import { DefaultLayoutComponent } from './default-layout.component';
import { PrimeNgModule } from '../../../primng.module';
import { LandingModule } from '../../../modules/landing/landing.module';
import { IconsProviderModule } from '../../../icon-provider.module';

@NgModule({
  imports: [
    SharedModule,
    DefaultLayoutRoutes,
    PrimeNgModule,
    LandingModule,
    IconsProviderModule
  ],
  declarations: [DefaultLayoutComponent],
})
export class DefaultLayoutModule {}
