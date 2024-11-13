import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { LandingComponent } from './component/landing/landing.component';
import { MainContentComponent } from './component/main-content/main-content.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from 'primeng/api';
import { PrimeNgModule } from '../../primng.module';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    MainContentComponent,
    FooterComponent,
  ],
  imports: [LandingRoutingModule, CommonModule, SharedModule, PrimeNgModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, MainContentComponent, LandingComponent],
})
export class LandingModule {}
