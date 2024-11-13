import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  // { path: '',component: DashboardComponent,},
  { path: 'product',component: ProductComponent,},
  // { path: 'product',component: CreateProductComponent,},

  // { path:'product/list', component:ProductListComponent}
];

export const DashboardRoutes = RouterModule.forChild(routes);
