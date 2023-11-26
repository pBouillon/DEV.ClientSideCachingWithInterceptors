import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";

import { Observable, of, tap } from "rxjs";

const cache = new Map<string, HttpEvent<unknown>>();

export const cachingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const cached = cache.get(req.url);

  const isCacheHit = cached !== undefined;
  if (isCacheHit) {
    return of(cached);
  }

  return next(req).pipe(tap((response) => cache.set(req.url, response)));
};
