import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseAPI } from '../../models/data-models';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  productAmount: any = 1;
  productId: string | null = null;
  product: any;
  selectedImage: string = '';
  seletedImageIndex: number = 0;
  isScrollAtLeftEdge: boolean = false;
  isScrollAtRightEdge: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  async getData() {
    if (this.productId) {
      let resp: ResponseAPI | null = await this.productService.getProductById(
        this.productId
      );
      if (resp && resp.status) {
        this.product = resp.data;
        this.selectedImage = this.product.images[0];
      }
    }
  }

  increament() {
    if (this.productAmount < 10) this.productAmount++;
  }

  decrement() {
    if (this.productAmount > 1) this.productAmount--;
  }

  validateAmount() {
    if (this.productAmount < 1) {
      this.productAmount = 1;
    }

    if (this.productAmount > 10) {
      this.productAmount = 10;
    }
  }

  scrollLeft(scrollContainer: HTMLElement): void {
    scrollContainer.scrollBy({
      left: -580,
      behavior: 'smooth',
    });
  }

  scrollRight(scrollContainer: HTMLElement): void {
    scrollContainer.scrollBy({
      left: 580,
      behavior: 'smooth',
    });
  }

  maximizeImage(image: string, index: number) {
    this.selectedImage = image;
    this.seletedImageIndex = index;
  }

  async addToCart() {
    if (this.productId) {
      let resp: ResponseAPI | null = await this.userService.addProductToCart(
        this.productId,
        this.productAmount
      );
      this.cartService.updateCart();
      this.cartService.openCart();
    }
  }
}
