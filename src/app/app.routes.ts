import { Routes } from '@angular/router';

import { HomeComponent } from './_pages/home/home.component';
import { BoardComponent } from './_pages/board/board.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'board/:id/:boardUrl',
    component: BoardComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
