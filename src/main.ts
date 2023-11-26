import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { Routes, provideRouter } from "@angular/router";

import { withComponentInputBinding } from "@angular/router";
import { AlbumComponent } from "./app/album.component";
import { AlbumsComponent } from "./app/albums.component";
import { AppComponent } from "./app/app.component";

const routes: Routes = [
  {
    path: "albums",
    children: [
      {
        path: "",
        component: AlbumsComponent,
      },
      {
        path: ":albumId",
        component: AlbumComponent,
      },
    ],
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "albums",
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
