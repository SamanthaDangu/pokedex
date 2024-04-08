import Pokemon from "../models/pokemon";

export default class PokemonService {
  static getPokemons(): Promise<Pokemon[]> {
    return fetch("https://tyradex.vercel.app/api/v1/pokemon")
      .then((response) => response.json())
      .then((data) => {
        // Filtre les Pokémon avec un ID différent de zéro
        const filteredData = data.filter(
          (pokemon: Pokemon) => pokemon.pokedex_id !== 0
        );
        return filteredData;
      })
      .catch((error) => this.handleError(error));
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    return fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => (this.isEmpty(data) ? null : data))
      .catch((error) => this.handleError(error));
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}
