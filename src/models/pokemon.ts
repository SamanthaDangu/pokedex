export default class Pokemon {
  pokedexId: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
    gmax: string | null;
  };
  types: Array<{
    name: string;
    image: string;
  }>;
  talents: Array<{
    name: string;
    tc: boolean;
  }>;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  resistances: Array<{
    name: string;
    multiplier: number;
  }>;
  evolution: {
    pre: Array<{
      pokedexId: number;
      name: string;
    }> | null;
    next: Array<{
      pokedexId: number;
      name: string;
      condition: string;
    }> | null;
    mega: Array<{
      orbe: string;
      sprites: {
        regular: string;
        shiny: string;
      };
    }> | null;
  };
  height: string;
  weight: string;
  egg_groups: Array<string>;
  sexe: {
    male: number;
    female: number;
  };
  catch_rate: number;
  level_100: number;
  forme: Array<{
    alola?: string;
    hisui?: string;
    galar?: string;
    paldea?: string;
  }>;

  constructor(pokemonData: any) {
    this.pokedexId = pokemonData.pokedexId;
    this.generation = pokemonData.generation;
    this.category = pokemonData.category;
    this.name = pokemonData.name;
    this.sprites = pokemonData.sprites;
    this.types = pokemonData.types;
    this.talents = pokemonData.talents;
    this.stats = pokemonData.stats;
    this.resistances = pokemonData.resistances;
    this.evolution = pokemonData.evolution;
    this.height = pokemonData.height;
    this.weight = pokemonData.weight;
    this.egg_groups = pokemonData.egg_groups;
    this.sexe = pokemonData.sexe;
    this.catch_rate = pokemonData.catch_rate;
    this.level_100 = pokemonData.level_100;
    this.forme = pokemonData.forme;
  }
}
