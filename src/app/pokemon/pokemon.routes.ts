import { Routes } from '@angular/router';
import { PokemonPageComponent } from './pages/pokemon-page/pokemon-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { PokemonComponent } from './pokemon.component';

export const POKEMON_ROUTES: Routes = [
  {
    path: '',
    component: PokemonComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search',
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: ':name',
        component: PokemonPageComponent,
      },
    ],
  },
];
