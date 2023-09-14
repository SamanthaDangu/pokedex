import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";
import EvolutionList from "../components/evolution-list"; 
import PokemonDetails from "../components/pokemon-details"; 
import { useHistory } from "react-router-dom";
import Loader from "../components/loader";

type Params = { id: string };

const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonPrev, setPokemonPrev] = useState<Pokemon | null>(null);
  const [pokemonNext, setPokemonNext] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PokemonService.getPokemon(+match.params.id);
        if (response && response.pokedexId) {
          setPokemon(response);
          setLoading(false);
        } else {
          history.push("/page-not-found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        history.push("/page-not-found");
      }
    };

    fetchData();
  }, [history, match.params.id]);

  useEffect(() => {
    if (pokemon) {
      // Calcule les IDs du Pokémon précédent et suivant
      const prevPokemonId = pokemon.pokedexId - 1;
      const nextPokemonId = pokemon.pokedexId + 1;

      const fetchPrevPokemon = async () => {
        try {
          let response;
          if (pokemon.pokedexId === 1) {
            // Si le Pokémon est le premier, charge le dernier Pokémon manuellement
            const lastPokemon = await PokemonService.getPokemon(1010);
            response = lastPokemon;
          } else {
            response = await PokemonService.getPokemon(prevPokemonId);
          }
          setPokemonPrev(response || null);
        } catch (error) {
          console.error("Error fetching previous Pokemon:", error);
        }
      };

      const fetchNextPokemon = async () => {
        try {
          let response;
          if (pokemon.pokedexId === 1010) {
            // Si le Pokémon est le dernier, charge le premier Pokémon manuellement
            const firstPokemon = await PokemonService.getPokemon(1);
            response = firstPokemon;
          } else {
            response = await PokemonService.getPokemon(nextPokemonId);
          }
          setPokemonNext(response || null);
        } catch (error) {
          console.error("Error fetching previous Pokemon:", error);
        }
      };

      fetchPrevPokemon();
      fetchNextPokemon();
    }
  }, [pokemon]);

  return (
    <div>
      {loading ? (
        <h4 className="center"> <Loader /> </h4>
      ) : (
        <div className="row">
          {pokemon && (
            <>
              {/* Afficher les détails du Pokémon */}
              <PokemonDetails pokemon={pokemon} pokemonPrev={pokemonPrev} pokemonNext={pokemonNext}/>

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
