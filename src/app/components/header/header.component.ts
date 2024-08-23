import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit() {
      this.currentRoute = this.router.url;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.urlAfterRedirects;
        }
      });
  }

  isHomePage(): boolean {
    return this.currentRoute === '/home';
  }

  openCart() {
    this.cartService.openCart();
  }
}
