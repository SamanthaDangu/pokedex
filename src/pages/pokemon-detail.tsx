import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";
import EvolutionList from "../components/evolution-list"; 
import PokemonDetails from "../components/pokemon-details"; 

type Params = { id: string };

const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    PokemonService.getPokemon(+match.params.id).then(pokemon => setPokemon(pokemon));
  }, [match.params.id]);

  return (
    <div>
      {pokemon ? (
        <div className="container row">
          {/* Afficher les détails du Pokémon */}
          <PokemonDetails pokemon={pokemon} />

          {/* Afficher les évolutions */}
          <EvolutionList pokemon={pokemon} />
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
};

export default PokemonsDetail;
