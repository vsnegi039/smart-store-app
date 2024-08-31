import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let tokens = this.authService.getLocalToken();
    let sysId = tokens?.sysId;

    let modifiedReq = req;

    if (tokens) {
      modifiedReq = modifiedReq.clone({
        headers: req.headers.set('Authorization', `Bearer ${tokens.authToken}`),
      });
    }

    if (req.method === 'GET') {
      const params = modifiedReq.params.set('sysId', sysId);
      modifiedReq = modifiedReq.clone({ params });
    } else if (req.method === 'POST' || req.method === 'PUT') {
      const body = { ...req.body, sysId };
      modifiedReq = modifiedReq.clone({ body });
    }

    // console.log('Modified Request:', modifiedReq);

    return next.handle(modifiedReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('Response received:', event);
        }
      }),
      finalize(() => {
        // console.log('Request completed');
      })
    );
  }
}
