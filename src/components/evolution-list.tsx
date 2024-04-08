import React, { FunctionComponent, useState, useEffect } from "react";
import "./evolution-list.css";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";
import PokemonCard from "./pokemon-card-detail";

type Props = {
  pokemon: Pokemon;
};

const EvolutionList: FunctionComponent<Props> = ({ pokemon }) => {
  const [preEvolutions, setPreEvolutions] = useState<Array<Pokemon>>([]);
  const [nextEvolutions, setNextEvolutions] = useState<Array<Pokemon>>([]);

  useEffect(() => {
    // Fonction pour obtenir les pré-évolutions
    const fetchPreEvolutions = async () => {
      if (
        pokemon.evolution &&
        pokemon.evolution.pre &&
        pokemon.evolution.pre.length > 0
      ) {
        const preEvolutionIds: number[] = pokemon.evolution.pre.map(
          (preEvolution: { pokedex_id: number }) => preEvolution.pokedex_id
        );

        const preEvoPromises: Promise<Pokemon | null>[] = preEvolutionIds.map(
          async (preEvoId: number) => PokemonService.getPokemon(preEvoId)
        );

        const preEvos: (Pokemon | null)[] = await Promise.all(preEvoPromises);

        // Filtrer les éléments null
        const filteredPreEvos: Pokemon[] = preEvos.filter(
          (evo): evo is Pokemon => evo !== null
        );

        setPreEvolutions(filteredPreEvos);
      }
    };

    // Fonction pour obtenir les next-évolutions
    const fetchNextEvolutions = async () => {
      if (
        pokemon.evolution &&
        pokemon.evolution.next &&
        pokemon.evolution.next.length > 0
      ) {
        const nextEvolutionIds: number[] = pokemon.evolution.next.map(
          (nextEvolution: { pokedex_id: number }) => nextEvolution.pokedex_id
        );

        const nextEvoPromises: Promise<Pokemon | null>[] = nextEvolutionIds.map(
          async (nextEvoId: number) => PokemonService.getPokemon(nextEvoId)
        );

        const nextEvos: (Pokemon | null)[] = await Promise.all(nextEvoPromises);

        // Filtrer les éléments null
        const filteredNextEvos: Pokemon[] = nextEvos.filter(
          (evo): evo is Pokemon => evo !== null
        );

        setNextEvolutions(filteredNextEvos);
      }
    };

    // Appelez les fonctions pour obtenir les pré-évolutions et les next-évolutions
    fetchPreEvolutions();
    fetchNextEvolutions();
  }, [pokemon]);

  return (
    <div
      className="section col s12 center"
      style={{
        backgroundColor: "#2575bb",
        borderRadius: "10px",
        color: "white",
        padding: "0px",
      }}
    >
      <h5>Évolutions</h5>
      {pokemon.evolution === null && (
        <div className="no-evolution">
          <p>Ce Pokémon n'a pas d'évolution.</p>
        </div>
      )}
      <div className="evolutions">
        {/* PRE-EVOLUTION */}
        {pokemon.evolution &&
          pokemon.evolution.pre &&
          pokemon.evolution.pre.length > 0 && (
            <div className="evolutions">
              {preEvolutions.map((preEvo, index) => (
                <PokemonCard key={index} pokemon={preEvo} />
              ))}
            </div>
          )}

        {/* POKEMON DE LA PAGE */}
        <PokemonCard pokemon={pokemon} />

        {/* NEXT-EVOLUTION */}
        {pokemon.evolution &&
          pokemon.evolution.next &&
          pokemon.evolution.next.length > 0 && (
            <div className="evolutions">
              {nextEvolutions.map((nextEvo, index) => (
                <PokemonCard key={index} pokemon={nextEvo} />
              ))}
            </div>
          )}
      </div>
      <h5>Méga-Évolution</h5>
      {pokemon.evolution && pokemon.evolution.mega === null && (
        <div>
          <p>Ce Pokémon n'a pas d'évolution.</p>
        </div>
      )}
      <div className="evolutions">
        {/* MEGA-EVOLUTION */}
        {pokemon.evolution &&
          pokemon.evolution.mega &&
          pokemon.evolution.mega.length > 0 && (
            <div className="evolutions">
              {pokemon.evolution.mega.map((pokemon, index) => (
                <div key={index}>
                  <div className="custom-card" style={{ margin: "16px" }}>
                    <div className="card-top">
                      <img
                        src={pokemon.sprites.regular}
                        alt={pokemon.orbe}
                        className="responsive-img"
                      />
                    </div>
                    <div className="section">
                      <h5>{pokemon.orbe}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default EvolutionList;
