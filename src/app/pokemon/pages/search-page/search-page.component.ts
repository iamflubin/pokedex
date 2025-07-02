import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-search-page',
  imports: [SearchBarComponent, PokemonListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  readonly query = signal<string>('');
  private readonly pokemonService = inject(PokemonService);
  private readonly router = inject(Router);

  nameList = this.pokemonService.pokemonNameList;

  filteredList = computed(() => {
    return this.nameList().filter((name) =>
      name.toLowerCase().startsWith(this.query().toLowerCase()),
    );
  });

  constructor() {
    effect(() => {
      const currentQuery = this.query().toLowerCase();
      const exactMatch = this.nameList().find(
        (name) => name.toLowerCase() === currentQuery,
      );

      if (exactMatch) {
        this.router.navigate(['pokemon', exactMatch]);
      }
    });
  }

  ngOnInit(): void {
    this.pokemonService.fetchPokemons().subscribe({
      error: (error) => {
        alert(error.message);
      },
    });
  }

  onSelect(name: string) {
    this.router.navigate(['pokemon', name]);
  }
}
