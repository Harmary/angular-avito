import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AUTH_TOKEN } from 'shared/consts/storageKeys';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', token),
    });

    return next(cloned);
  } else {
    return next(req);
  }
}
