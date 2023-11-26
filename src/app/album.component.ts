import { AsyncPipe } from "@angular/common";
import { Component, Input, inject } from "@angular/core";

import { BehaviorSubject, EMPTY, Observable, iif, switchMap } from "rxjs";
import { AlbumService, Photo } from "./album.service";

@Component({
  selector: "app-album",
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <section>
      @if(albumId$ | async; as albumId) {
      <h2>Album #{{ albumId }}</h2>

      @if (photos$ | async; as photos) {
      <p>This album as {{ photos.length }} photos</p>
      } }
    </section>
  `,
})
export class AlbumComponent {
  readonly #albumService = inject(AlbumService);

  readonly albumId$ = new BehaviorSubject<number | null>(null);
  readonly photos$: Observable<Photo[]> = this.albumId$.pipe(
    switchMap((id) =>
      iif(() => id === null, EMPTY, this.#albumService.get(id!))
    )
  );

  @Input() set albumId(id: number) {
    this.albumId$.next(id);
  }
}
