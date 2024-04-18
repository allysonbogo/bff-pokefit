import { Controller, Get, Param } from '@nestjs/common';
import { PokemonsService } from 'src/modules/pokemons/services/pokemons.service';
import { AllPokemon, Pokemon } from '../interfaces/pokemon.interface';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async getAllPokemons(): Promise<AllPokemon[]> {
    return this.pokemonsService.getAllPokemons();
  }

  @Get('id/:id')
  async getPokemonById(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonsService.getPokemonById(id);
  }
}
