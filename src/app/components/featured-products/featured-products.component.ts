import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ResponseAPI } from '../../models/data-models';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  featuredProducts = [];
  dummyContainer = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  async getFeaturedProducts() {
    let resp: ResponseAPI | null =
      await this.productService.getFeaturedProducts();
    if (resp && resp.status) {
      this.featuredProducts = resp.data;
    }
  }
}
