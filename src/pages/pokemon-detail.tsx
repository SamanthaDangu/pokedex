import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";
import EvolutionList from "../components/evolution-list"; 
import PokemonDetails from "../components/pokemon-details"; 
import { useHistory } from "react-router-dom";

type Params = { id: string };

const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const history = useHistory();

  useEffect(() => {
  
    PokemonService.getPokemon(+match.params.id)
      .then((response) => {
        if (response && response.pokedexId) {
          setPokemon(response);
        } 
      })
      .catch(() => {
        history.push("/page-not-found");
      })
  }, [history, match.params.id]);
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
