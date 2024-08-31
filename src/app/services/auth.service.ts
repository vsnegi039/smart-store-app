import { Injectable } from '@angular/core';
import { ResponseAPI } from '../models/data-models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  setLocalToken(token: any) {
    if (environment.production && false) {
      // this.cookieService.set(
      //   TOKEN_VAR,
      //   JSON.stringify(this.loggedInUser.token),
      //   { sameSite: 'Lax', secure: true, domain: APP_DOMAIN, path: '/' }
      // );
    } else {
      localStorage.setItem(environment.TOKEN_VAR, JSON.stringify(token));
    }
  }

  getLocalToken() {
    let token = null;
    if (environment.production && false) {
      // token = this.cookieService.get(TOKEN_VAR);
    } else {
      token = localStorage.getItem(environment.TOKEN_VAR);
    }

    if (!token) return null;
    return JSON.parse(token);
  }

  async generateSession(): Promise<ResponseAPI | null> {
    try {
      const resp = await this.httpClient
        .get<ResponseAPI>(`${environment.API_URL}/auth/session`)
        .toPromise();
      return resp?.status ? resp : null;
    } catch (err) {
      console.log((err as any).message);
      return null;
    }
  }
}
