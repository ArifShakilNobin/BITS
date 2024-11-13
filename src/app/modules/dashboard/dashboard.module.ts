import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { PrimeNgModule } from '../../primng.module';
import { DashboardRoutes } from './dashboard.routing';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  imports: [CommonModule, SharedModule, PrimeNgModule, DashboardRoutes],
  declarations: [
    DashboardComponent,
    CreateProductComponent,
    ProductListComponent,
    ProductComponent
  ],
  exports: [CreateProductComponent, ProductListComponent],
})
export class DashboardModule {}
