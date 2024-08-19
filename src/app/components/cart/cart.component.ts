import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ResponseAPI } from '../../models/data-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('staticBackdrop') bootstrapSidebarButton: any;
  cart: any = [];
  totalPrice: number = 0;
  private openCartSubscription: Subscription = Subscription.EMPTY;
  private updateCartSubscription: Subscription = Subscription.EMPTY;
  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.openCartSubscription = this.cartService.openCart$.subscribe(() => {
      this.openCart();
    });
    this.updateCartSubscription = this.cartService.updateCart$.subscribe(() => {
      this.getData();
    });
  }

  async getData() {
    let resp: ResponseAPI | null = await this.cartService.getCartProducts();
    if (resp?.status) {
      this.cart = resp.data;
      this.cartService.products = resp.data;
      this.totalPrice = 0;
      this.cart.forEach((product: any) => {
        this.totalPrice += product.count * product.productId.price;
        this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
      });
    }
  }

  openCart() {
    this.bootstrapSidebarButton.nativeElement.click();
  }

  ngOnDestroy(): void {
    if (this.openCartSubscription) {
      this.openCartSubscription.unsubscribe();
    }
    if (this.updateCartSubscription) {
      this.updateCartSubscription.unsubscribe();
    }
  }

  async removeProduct(productId: string) {
    console.log(`Remvoe: ${productId}`);
    let resp: ResponseAPI | null = await this.cartService.removeProduct(
      productId
    );
    this.getData();
  }
}
