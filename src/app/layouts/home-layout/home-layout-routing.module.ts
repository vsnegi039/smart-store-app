import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '../../pages/landing-page/landing-page.component';
import { ProductsPageComponent } from '../../pages/products-page/product-page.component';
import { ProductPageComponent } from '../../pages/product-page/product-page.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'product/:id', component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLayoutRoutingModule {
}
