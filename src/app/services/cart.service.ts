import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ResponseAPI } from '../models/data-models';
import { environment } from '../../environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  isCartHidden: boolean = true;
  private openCartSubject = new Subject<void>();
  private updateCartSubject = new Subject<void>();
  openCart$ = this.openCartSubject.asObservable();
  updateCart$ = this.updateCartSubject.asObservable();
  products = [];
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  openCart() {
    this.openCartSubject.next();
  }

  updateCart() {
    this.updateCartSubject.next();
  }

  async getCartProducts(): Promise<ResponseAPI | null> {
    try {
      let tokens = this.authService.getLocalToken();
      console.log(tokens.authToken);
      const resp = await this.httpClient
        .get<ResponseAPI>(
          `${environment.API_URL}/cart?userId=${
            tokens.authToken ? tokens.authToken : ''
          }&sysId=${tokens.sysId ? tokens.sysId : ''}`
        )
        .toPromise();

      return resp?.status ? resp : null;
    } catch (err) {
      console.error((err as any).message);
      return null;
    }
  }

  async removeProduct(productId:string): Promise<ResponseAPI | null> {
    try {
      let tokens = this.authService.getLocalToken();
      const resp = await this.httpClient
        .delete<ResponseAPI>(`${environment.API_URL}/cart?userId=${tokens.authToken?tokens.authToken:""}&sysId=${tokens.sysId?tokens.sysId:""}&productId=${productId}`)
        .toPromise();

      return resp?.status ? resp : null;
    } catch (err) {
      console.error((err as any).message);
      return null;
    }
  }
}
