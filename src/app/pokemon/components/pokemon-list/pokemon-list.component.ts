import { Component, input, output } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  list = input.required<string[]>();

  select = output<string>();

  onSelect(name: string) {
    this.select.emit(name);
  }
}
