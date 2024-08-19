
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: any;

  constructor(private router: Router) { };

  navigateToProductPage(id:string) {
    this.router.navigate(['/product/' + id]);
  }
}
