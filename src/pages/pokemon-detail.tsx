import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";
import EvolutionList from "../components/evolution-list"; 
import PokemonDetails from "../components/pokemon-details"; 
import { useHistory } from "react-router-dom";
import Loader from "../components/loader";

type Params = { id: string };

const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
  
    PokemonService.getPokemon(+match.params.id)
      .then((response) => {
        if (response && response.pokedexId) {
          setPokemon(response);
          setLoading(false);
        } else {
          history.push("/page-not-found");
        }
      })
  }, [history, match.params.id]);
  return (
    <div>
      {loading ? (
        <h4 className="center"> <Loader /> </h4>
      ) : (
        <div className="container row">
          {pokemon && (
            <>
              {/* Afficher les détails du Pokémon */}
              <PokemonDetails pokemon={pokemon} />

              {/* Afficher les évolutions */}
              <EvolutionList pokemon={pokemon} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonsDetail;
