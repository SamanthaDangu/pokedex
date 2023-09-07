import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from '../models/pokemon';
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-service";
import PokemonSearch from "../components/pokemon-search";
import Loader from "../components/loader";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [rowClass, setRowClass] = useState<string>("row");

  useEffect(() => {
    PokemonService.getPokemons().then(pokemons => setPokemons(pokemons));
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

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className={`container ${rowClass}`}>
        <PokemonSearch />
        {pokemons.length > 0 ? (
          pokemons.map(pokemon => (
            <PokemonCard key={pokemon.pokedexId} pokemon={pokemon} />
          ))
        ) : (
          <h4 className="center"><Loader /></h4>
        )}
      </div>
    </div>
  );
}

export default PokemonList;
