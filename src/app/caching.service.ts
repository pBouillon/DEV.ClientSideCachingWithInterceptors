import { HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CachingService {
  readonly #cache = new Map<string, HttpEvent<unknown>>();

  get(key: string): HttpEvent<unknown> | undefined {
    return this.#cache.get(key);
  }

  set(key: string, value: HttpEvent<unknown>): void {
    if (key.includes("album")) {
      this.set(key, value);
    }
  }
}
