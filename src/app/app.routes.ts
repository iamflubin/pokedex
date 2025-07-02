import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pokemon',
  },
  {
    path: 'pokemon',
    loadChildren: () =>
      import('./pokemon/pokemon.routes').then((m) => m.POKEMON_ROUTES),
  },
];
