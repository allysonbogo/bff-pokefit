export interface AllPokemon {
  readonly name: string;
  readonly url: string;
}

export interface Pokemon {
  readonly id: string;
  readonly name: string;
  readonly types: string[];
  readonly height: number;
  readonly weight: number;
  readonly officialArtwork: string;
}
