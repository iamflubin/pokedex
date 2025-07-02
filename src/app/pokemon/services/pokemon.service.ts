import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { Pokemon, PokemonList } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly _pokemonNameList = signal<string[]>([]);
  readonly pokemonNameList = this._pokemonNameList.asReadonly();

  private readonly _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  private readonly http = inject(HttpClient);

  private readonly _pokemon = signal<Pokemon | null>(null);
  readonly pokemon = this._pokemon.asReadonly();

  fetchPokemons(): Observable<PokemonList> {
    this._loading.set(true);
    this._pokemonNameList.set([]);
    return this.http
      .get<PokemonList>(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`,
      )
      .pipe(
        tap((response) =>
          this._pokemonNameList.set(
            response.results.map((result) => result.name),
          ),
        ),
        finalize(() => this._loading.set(false)),
      );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(tap((pokemon) => this._pokemon.set(pokemon)));
  }
}
