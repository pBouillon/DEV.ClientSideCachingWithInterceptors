import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";

import { RouterModule } from "@angular/router";

@Component({
  selector: "app-albums",
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  template: `
    <section>
      <h2>Albums</h2>

      <div class="grid">
        @for (albumId of listedAlbumIds; track $index) {
        <article>
          <header>Album #{{ albumId }}</header>
          <a [routerLink]="[albumId]" role="button">Browse</a>
        </article>
        }
      </div>
    </section>
  `,
})
export class AlbumsComponent {
  readonly listedAlbumIds = [1, 2, 3];
}
