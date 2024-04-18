import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/shared/infra/api/api.service';
import { AllPokemon, Pokemon } from '../interfaces/pokemon.interface';

@Injectable()
export class PokemonsService {
  constructor(private readonly apiService: ApiService) {}

  async getAllPokemons(): Promise<AllPokemon[]> {
    const {
      data: { results },
    } = await this.apiService.pokeApi.get('/pokemon?offset=0&limit=151');

    return results;
  }

  async getPokemonById(id: string): Promise<Pokemon> {
    if (Number(id) > 151)
      throw new BadRequestException(
        'Pokémon not yet registered in this Pokédex',
      );

    const { data } = await this.apiService.pokeApi.get(`/pokemon/${id}`);

    const pokemonInfo = {
      id: data.id,
      name: data.name,
      types: data.types.map((type: any) => type.type.name),
      height: data.height,
      weight: data.weight,
      officialArtwork: data.sprites.other['official-artwork'].front_default,
    };

    return pokemonInfo;
  }
}
