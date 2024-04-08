import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
import "./pokemon-list.css";
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-service";
import PokemonSearch from "../components/pokemon-search";
import Loader from "../components/loader";
import formatGeneration from "../utils/format-generation";
import GenerationList from "../components/generation-list";
import IntroductionPokedex from "../components/introduction-pokedex";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons));
  }, []);

  // Pokémons par générations
  const generations: { [key: string]: Pokemon[] } = {};

  pokemons.forEach((pokemon) => {
    if (!generations[pokemon.generation]) {
      generations[pokemon.generation] = [];
    }
    generations[pokemon.generation].push(pokemon);
  });

  return (
    <div>
      <a
        className="btn-floating btn-large waves retour"
        href={`#top`}
        style={{ backgroundColor: "#003060" }}
      >
        <i className="material-icons">arrow_upward</i>
      </a>

      <div>
        <IntroductionPokedex />

        <PokemonSearch />

        {/* Liens vers chaque génération */}
        <GenerationList generations={generations} />

        {/* Boucle pour chaque génération */}
        {Object.keys(generations).map((generation) => (
          <div
            id={`generation-${generation}`}
            className="card"
            key={generation}
            style={{
              marginTop: "32px",
              border: "3px solid #003060",
              borderRadius: "10px",
            }}
          >
            <h2
              className="center"
              style={{
                borderBottom: "3px solid #003060",
                margin: "30px",
                paddingBottom: "16px",
              }}
            >
              {formatGeneration(Number(generation))}
            </h2>
            <div className="row">
              {generations[generation].map((pokemon) => (
                <PokemonCard key={pokemon.pokedex_id} pokemon={pokemon} />
              ))}
            </div>
          </div>
        ))}

        {pokemons.length === 0 && (
          <h4 className="center">
            <Loader />
          </h4>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
