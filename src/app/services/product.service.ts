import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseAPI } from '../models/data-models';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  async getFeaturedProducts(): Promise<ResponseAPI | null> {
    try {
      const resp = await this.httpClient
        .get<ResponseAPI>(`${environment.API_URL}/product/featured`)
        .toPromise();

      return resp?.status ? resp : null;
    } catch (err) {
      console.error((err as any).message);
      return null;
    }
  }

  async getSearchData(
    searchString: string,
    category: string,
    pageNumber: number
  ): Promise<ResponseAPI | null> {
    try {
      const resp = await this.httpClient
        .get<ResponseAPI>(
          `${environment.API_URL}/product/search?searchString=${searchString}&category=${category}&page=${pageNumber}`
        )
        .toPromise();

      return resp?.status ? resp : null;
    } catch (err) {
      console.error((err as any).message);
      return null;
    }
  }

  async getTopFiveProducts(): Promise<ResponseAPI | null> {
    try {
      const resp = await this.httpClient
        .get<ResponseAPI>(`${environment.API_URL}/product/top-rated`)
        .toPromise();

      return resp?.status ? resp : null;
    } catch (err) {
      console.error((err as any).message);
      return null;
    }
  }

  async getProductById(id:string): Promise<ResponseAPI | null> {
    try {
      const resp = await this.httpClient
        .get<ResponseAPI>(`${environment.API_URL}/product/${id}`)
        .toPromise();

      return resp?.status ? resp : null;
    } catch (err) {
      console.error((err as any).message);
      return null;
    }
  }
}
