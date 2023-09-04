import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from '../models/pokemon';
import PokemonCard from "../components/pokemon-card";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [rowClass, setRowClass] = useState<string>("row");

  useEffect(() => {
    fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
      .then((response) => response.json())
      .then((pokemons) => {
        setPokemons(pokemons);
      });
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
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.pokedexId} pokemon={pokemon}/>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
