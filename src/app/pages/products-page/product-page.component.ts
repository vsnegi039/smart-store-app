import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ResponseAPI } from '../../models/data-models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductsPageComponent implements OnInit {
  page = 1;
  products = [];
  totalProducts = 0;
  numOfPage = 0;
  categoryCounts: any = [];
  selectedCategory: string = '';
  bestProducts: any = [];
  searchString: string = '';
  pagination = {
    left: 1,
    middle: 2,
    right: 3,
  };

  // Variables to store previous search parameters
  private prevCategory: string = '';
  private prevSearchString: string = '';
  private prevPage: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let category = params['category'];
      if (category) this.selectedCategory = category;
      this.getData(this.page);
      this.getTopProducts();
    });
  }

  async getData(page: number) {
    let res: ResponseAPI | null = await this.productService.getSearchData(
      this.searchString,
      this.selectedCategory,
      page - 1
    );
    if (res && res.status) {
      this.products = res.data.products;
      this.totalProducts = res.data.totalProducts;
      this.categoryCounts = res.data.categoryCounts;
      this.prevSearchString = this.searchString;
      this.prevCategory = this.selectedCategory;
      this.prevPage = this.page;
      this.numOfPage = Math.ceil(this.totalProducts / 12);
    }
  }

  updateCategory(category: string) {
    if (this.selectedCategory === category) return;
    this.selectedCategory = category;
    this.updateSearch();
  }

  async getTopProducts() {
    let resp: ResponseAPI | null =
      await this.productService.getTopFiveProducts();
    if (resp && resp.status) this.bestProducts = resp.data;
  }

  updateSearch() {
    if (
      this.searchString === this.prevSearchString &&
      this.selectedCategory === this.prevCategory &&
      this.page === this.prevPage
    ) {
      return;
    }
    this.prevSearchString = this.searchString;
    this.prevCategory = this.selectedCategory;
    this.page = 1;
    this.getData(this.page);
  }

  setDefaultSetting() {
    this.searchString = '';
    this.selectedCategory = '';
    this.updateSearch();
  }

  setPage(page: number, scrollLeft: boolean, scrollRight: boolean) {
    if (scrollLeft && this.pagination.left===this.page) {
      this.pagination.left--;
      this.pagination.middle--;
      this.pagination.right--;
    }
    if (scrollRight && this.pagination.right===this.page) {
      this.pagination.left++;
      this.pagination.middle++;
      this.pagination.right++;
    }
    this.page = page;
    this.getData(this.page);
  }
}
