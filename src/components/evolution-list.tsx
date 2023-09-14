import React, { FunctionComponent, useState, useEffect } from "react";
import "./evolution-list.css";
import Pokemon from "../models/pokemon";
import formatType from "../utils/format-type";
import PokemonService from "../services/pokemon-service";

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
          (preEvolution: { pokedexId: number }) => preEvolution.pokedexId
        );

        const preEvoPromises: Promise<Pokemon | null>[] = preEvolutionIds.map(
          async (preEvoId: number) => PokemonService.getPokemon(preEvoId)
        );

        const preEvos: (Pokemon | null)[] = await Promise.all(preEvoPromises);

        // Filtre les éléments null
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
          (nextEvolution: { pokedexId: number }) => nextEvolution.pokedexId
        );

        const nextEvoPromises: Promise<Pokemon | null>[] = nextEvolutionIds.map(
          async (nextEvoId: number) => PokemonService.getPokemon(nextEvoId)
        );

        const nextEvos: (Pokemon | null)[] = await Promise.all(nextEvoPromises);

        // Filtre les éléments null
        const filteredNextEvos: Pokemon[] = nextEvos.filter(
          (evo): evo is Pokemon => evo !== null
        );

        setNextEvolutions(filteredNextEvos);
      }
    };

    fetchPreEvolutions();
    fetchNextEvolutions();
  }, [pokemon]);

  return (
    <div
      className="section col s12 center"
      style={{
        backgroundColor: "#A4A4A4",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <section>
        <h5>Évolutions</h5>
        {pokemon.evolution === null && (
          <div className="no-evolution">
            <p>Ce Pokémon n'a pas d'évolution.</p>
          </div>
        )}
      </section>
      <div className="evolutions">
        {/** PRE-EVOLUTION*/}
        {pokemon.evolution &&
          pokemon.evolution.pre &&
          pokemon.evolution.pre.length > 0 && (
            <div className="evolutions">
              {preEvolutions.map((preEvo, index) => (
                <div
                  key={index}
                  className="evolutions"
                  style={{ margin: "10px" }}
                >
                  <div className="custom-card">
                    <div className="card-top">
                      <img
                        src={preEvo.sprites.regular}
                        alt={preEvo.name.fr}
                        className="round-image responsive-img"
                      />
                    </div>
                    <div className="section">
                      <h5>
                        {preEvo.name.fr}{" "}
                        <span style={{ color: "#616161" }}>
                          N°{preEvo.pokedexId}
                        </span>
                      </h5>
                      <div>
                        {preEvo.types.map((type, index) => (
                          <span key={index} className={formatType(type.name)}>
                            {type.name}
                            <img
                              src={type.image}
                              alt={type.name}
                              className="responsive-img"
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {preEvo.evolution &&
                    preEvo.evolution.next &&
                    preEvo.evolution.next.length > 0 && (
                      <i className="large material-icons">chevron_right</i>
                    )}
                </div>
              ))}
            </div>
          )}

        {/** POKEMON DE LA PAGE*/}
        <div style={{ margin: "10px" }}>
          <div className="custom-card">
            <div className="card-top">
              {
                <img
                  src={pokemon.sprites.regular}
                  alt={pokemon.name.fr}
                  className="round-image responsive-img"
                />
              }
            </div>
            <div className="section">
              <h5>
                {pokemon.name.fr}{" "}
                <span style={{ color: "#616161" }}>N°{pokemon.pokedexId}</span>
              </h5>
              <div>
                {pokemon.types.map((type, index) => (
                  <span key={index} className={formatType(type.name)}>
                    {type.name}{" "}
                    <img
                      src={type.image}
                      alt={type.name}
                      className="responsive-img"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {pokemon.evolution &&
          pokemon.evolution.next &&
          pokemon.evolution.next.length > 0 && (
            <i className="large material-icons">chevron_right</i>
          )}
        {/** NEXT-EVOLUTION*/}
        {pokemon.evolution &&
          pokemon.evolution.next &&
          pokemon.evolution.next.length > 0 && (
            <div className="evolutions">
              {nextEvolutions.map((nextEvo, index) => (
                <div
                  key={index}
                  className="evolutions"
                  style={{ margin: "10px" }}
                >
                  <div className="custom-card">
                    <div className="card-top">
                      <img
                        src={nextEvo.sprites.regular}
                        alt={nextEvo.name.fr}
                        className="round-image responsive-img"
                      />
                    </div>
                    <div className="section">
                      <h5>
                        {nextEvo.name.fr}{" "}
                        <span style={{ color: "#616161" }}>
                          N°{nextEvo.pokedexId}
                        </span>
                      </h5>
                      <div>
                        {nextEvo.types.map((type, index) => (
                          <span key={index} className={formatType(type.name)}>
                            {type.name}
                            <img
                              src={type.image}
                              alt={type.name}
                              className="responsive-img"
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {nextEvo.evolution &&
                    nextEvo.evolution.next &&
                    nextEvo.evolution.next.length > 0 && (
                      <i className="large material-icons">chevron_right</i>
                    )}
                </div>
              ))}
            </div>
          )}
      </div>
      <h5>Méga-Évolution</h5>
      {pokemon.evolution && pokemon.evolution.mega === null && (
        <div className="no-evolution">
          <p>Ce Pokémon n'a pas d'évolution.</p>
        </div>
      )}
      <div className="evolutions">
        {/** MEGA-EVOLUTION*/}
        {pokemon.evolution &&
          pokemon.evolution.mega &&
          pokemon.evolution.mega.length > 0 && (
            <div>
              {pokemon.evolution.mega.map((pokemon, index) => (
                <div key={index}>
                  <div className="custom-card">
                    <div className="card-top">
                      <img
                        src={pokemon.sprites.regular}
                        alt={pokemon.orbe}
                        className="round-image responsive-img"
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
