import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";

import { Observable, of, tap } from "rxjs";

import { CachingService } from "./caching.service";

export const cachingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const cache = inject(CachingService);

  const cached = cache.get(req.url);

  const isCacheHit = cached !== undefined;
  if (isCacheHit) {
    return of(cached);
  }

  return next(req).pipe(tap((response) => cache.set(req.url, response)));
};
