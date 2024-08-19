import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeLayoutRoutingModule } from './home-layout-routing.module';
import { HomeComponent } from '../../components/home/home.component';
import { LandingPageComponent } from '../../pages/landing-page/landing-page.component';
import { WidgetComponent } from '../../components/widget/widget.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { ProductComponent } from '../../components/product/product.component';
import { ProductsPageComponent } from '../../pages/products-page/product-page.component';
import { ProductPageComponent } from '../../pages/product-page/product-page.component';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomeComponent,
    LandingPageComponent,
    WidgetComponent,
    FeaturedProductsComponent,
    ProductComponent,
    ProductsPageComponent,
    ProductPageComponent,
  ],
  imports: [CommonModule, HomeLayoutRoutingModule, FormsModule, FontAwesomeModule],
})
export class HomeLayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faChevronLeft, faChevronRight);
  }
}
