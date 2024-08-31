import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ResponseAPI } from '../models/data-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  async addProductToCart(
    productId: string,
    productCount: number
  ): Promise<ResponseAPI | null> {
    try {
      let tokens = this.authService.getLocalToken();
      const resp = await this.httpClient
        .post<ResponseAPI>(`${environment.API_URL}/cart/session/add`, {
          productCount,
          productId,
          sysId: tokens?.sysId,
        })
        .toPromise();

      return resp?.status ? resp : null;
    } catch (err) {
      console.log((err as any).message);
      return null;
    }
  }
}
