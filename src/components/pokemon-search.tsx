import React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./pokemon-search.css";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";

const PokemonSearch: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons));
  });

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>):void => {
    let value = e.target.value;
    value.length > 1 && setSearchTerm(value);
  };

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card">
          <div className="card-content">
            <div className="input-field">
              <input
                type="text"
                placeholder="Rechercher un pokémon"
                onChange={handleSearchTerm}
              />
            </div>
            <div className="collection">
              {searchTerm && pokemons
                .filter((val) => {
                  return val.name.fr.toLowerCase().includes(searchTerm.toLocaleLowerCase());
                })
                .map((val) => (
                  <Link
                    key={val.pokedexId}
                    to={`/pokemons/${val.pokedexId}`}
                    className="collection-item"
                  >
                    {val.name.fr}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
