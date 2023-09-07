import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
import "./pokemon-list.css"
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-service";
import PokemonSearch from "../components/pokemon-search";
import Loader from "../components/loader";
import formatGeneration from "../utils/format-generation";
import GenerationList from "../components/generation-list";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [rowClass, setRowClass] = useState<string>("row");

  useEffect(() => {
    PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1550) {
        setRowClass("row");
      } else {
        setRowClass(""); // Supprime la classe lorsque la taille de la fenêtre est inférieure à 1550px
      }
    };

    // Écoute des changements de taille de la fenêtre
    window.addEventListener("resize", handleResize);

    handleResize();

    // Nettoie l'écouteur d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
      <h1 className="center">Pokédex</h1>
      <a
        className="btn-floating btn-large waves retour"
        href={`#top`}
        style={{ backgroundColor: "#003060" }}
      >
        <i className="material-icons">arrow_upward</i>
      </a>
      <div className={`container ${rowClass}`}>
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
              marginTop: "50px",
              backgroundColor: "lightblue",
              border: "3px solid #003060",
              borderRadius: "10px",
            }}
          >
            <h2
              className="center"
              style={{
                backgroundColor: "lightblue",
                borderBottom: "3px solid #003060",
                margin: "30px",
                paddingBottom: "16px",
                color: "#003060",
              }}
            >
              {formatGeneration(Number(generation))}
            </h2>
            <div className="row">
              {generations[generation].map((pokemon) => (
                <PokemonCard key={pokemon.pokedexId} pokemon={pokemon} />
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
