import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-page',
  imports: [CommonModule],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss',
})
export class PokemonPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly name = this.route.snapshot.paramMap.get('name');

  private readonly pokemonService = inject(PokemonService);
  pokemon = this.pokemonService.pokemon;

  ngOnInit(): void {
    if (this.name) {
      this.pokemonService.getPokemonByName(this.name).subscribe();
    }
  }

  getSprites(pokemon: Pokemon): string[] {
    const s = pokemon.sprites;
    return [
      s.front_default,
      s.back_default,
      s.front_shiny,
      s.back_shiny,
      s.other['official-artwork'].front_default,
    ].filter(Boolean);
  }
}
