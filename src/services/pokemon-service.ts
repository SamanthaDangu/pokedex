import Pokemon from "../models/pokemon";
 
export default class PokemonService {
 
  static getPokemons(): Promise<Pokemon[]> {
    return fetch('https://api-pokemon-fr.vercel.app/api/v1/pokemon')
      .then(response => response.json());
  }
 
  static getPokemon(id: number): Promise<Pokemon|null> {
    return fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${id}`)

      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data);
      
  }
 
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }
}
