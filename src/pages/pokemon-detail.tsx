import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Pokemon from "../models/pokemon";
import formatType from "../utils/format-type";
import formatGeneration from '../utils/format-generation';
import "./pokemon-detail.css";

type Params = { id: string };

const PokemonsDetail: FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [preEvolutions, setPreEvolutions] = useState<Array<Pokemon>>([]);
  const [nextEvolutions, setNextEvolutions] = useState<Array<Pokemon>>([]);
  const colorNumber = "#616161";
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${match.params.id}`)
      .then((response) => response.json())
      .then((pokemon) => {
        if(pokemon.pokedexId) setPokemon(pokemon);
        // Vérifiez s'il y a des pré-évolutions
        if (
          pokemon.evolution &&
          pokemon.evolution.pre &&
          pokemon.evolution.pre.length > 0
        ) {
          // Effectuez des requêtes pour obtenir les pré-évolutions
          const preEvolutionIds: number[] = pokemon.evolution.pre.map(
            (preEvolution: { pokedexId: number }) => preEvolution.pokedexId
          );
          Promise.all(
            preEvolutionIds.map((preEvoId: number) =>
              fetch(
                `https://api-pokemon-fr.vercel.app/api/v1/pokemon/${preEvoId}`
              ).then((response) => response.json())
            )
          ).then((preEvos) => {
            setPreEvolutions(preEvos);
          });
        }
        // Vérifiez s'il y a des nexts-évolutions
        if (
          pokemon.evolution &&
          pokemon.evolution.next &&
          pokemon.evolution.next.length > 0
        ) {
          // Effectuez des requêtes pour obtenir les next-évolutions
          const nextEvolutionIds: number[] = pokemon.evolution.next.map(
            (nextEvolution: { pokedexId: number }) => nextEvolution.pokedexId
          );
          Promise.all(
            nextEvolutionIds.map((nextEvoId: number) =>
              fetch(
                `https://api-pokemon-fr.vercel.app/api/v1/pokemon/${nextEvoId}`
              ).then((response) => response.json())
            )
          ).then((nextEvos) => {
            setNextEvolutions(nextEvos);
          });
        }
      });
  }, [match.params.id]);

  const toggleShiny = () => {
    setIsShiny((prevIsShiny) => !prevIsShiny);
  };

  return (
    <div>
      {pokemon ? (
        <div className="container row">
          <div className="col s12">
            <h2 className="header center">
              {pokemon.name.fr}{" "}
              <span style={{ color: colorNumber }}>N°{pokemon.pokedexId}</span>
            </h2>
            <div className="section">
              {/* Bloc haut gauche */}
              <div className="col s12 m6">
                <div className="card-image">
                  <img
                    src={
                      isShiny ? pokemon.sprites.shiny : pokemon.sprites.regular
                    }
                    alt={pokemon.name.fr}
                    style={{ width: "400px", margin: "0 auto" }}
                    className="responsive-img"
                  />
                </div>
                {pokemon.sprites.shiny && (
                  <div className="right-align">
                    <button
                      onClick={toggleShiny}
                      className="waves-effect waves-light btn right-align"
                    >
                      Shiny
                    </button>
                  </div>
                )}

                <section className="section">
                  <h5 className="center">Stats de base</h5>
                  <div className="row">
                    <div className="col s6" style={{ paddingRight: "0" }}>
                      <table className="bordered striped">
                        <tbody>
                          <tr>
                            <td className="right-align">PV</td>
                            <td className="center">
                              <strong>{pokemon.stats.hp}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="right-align">Attaque</td>
                            <td className="center">
                              <strong>{pokemon.stats.atk}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="right-align">Défense</td>
                            <td className="center">
                              <strong>{pokemon.stats.def}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col s6" style={{ paddingLeft: "0" }}>
                      <table className="bordered striped">
                        <tbody>
                          <tr>
                            <td className="right-align">Attaque Spé</td>
                            <td className="center">
                              <strong>{pokemon.stats.spe_atk}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="right-align">Défense Spé</td>
                            <td className="center">
                              <strong>{pokemon.stats.spe_def}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="right-align">Vitesse</td>
                            <td className="center">
                              <strong>{pokemon.stats.vit}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
              {/* Bloc haut droite */}
              <div className="col s8 m6" style={{ paddingLeft: "30px"}}>
                <section
                  className="section col s12"
                  style={{
                    backgroundColor: "#A4A4A4",
                    borderRadius: "10px",
                    color: "white",
                  }}
                >
                  <div className="col s6">
                    <h5>Taille</h5>
                    <p>{pokemon.height}</p> <h5>Poids</h5>
                    <p>{pokemon.weight}</p> <h5>Sexe</h5>
                    <p>
                      {pokemon.sexe === null && (
                        <i className="material-icons">close</i>
                      )}
                      {pokemon.sexe && pokemon.sexe.male >= 1 && (
                        <i className="material-icons">male</i>
                      )}
                      {pokemon.sexe && pokemon.sexe.female >= 1 && (
                        <i className="material-icons">female</i>
                      )}
                    </p>
                  </div>
                  <div className="col s6">
                    <h5>Catégorie</h5>
                    <p>{pokemon.category}</p>
                    <h5>Talent</h5>
                    <p>
                      {pokemon.talents.map((talent, index) => (
                        <span key={index}>{talent.name} </span>
                      ))}
                    </p>
                    <h5>Forme régionale</h5>
                    <p>
                      {pokemon.forme && pokemon.forme[0]
                        ? Object.values(pokemon.forme[0])[0]
                        : "Non"}
                    </p>
                  </div>
                </section>
                <section className="section col s12">
                  <h5>Région</h5>
                  <p>{formatGeneration(pokemon.generation)}</p>
                  <h5>Type(s)</h5>
                  <div>
                    {pokemon.types.map((type, index) => (
                      <span key={index} className={formatType(type.name)}>
                        {type.name} <img src={type.image} alt={type.name} className="responsive-img"/>
                      </span>
                    ))}
                  </div>
                  <h5>Faiblesse(s)</h5>
                  <div>
                    {pokemon.resistances.map((resistance, index) =>
                      resistance.multiplier === 2 ? (
                        <span
                          key={index}
                          className={`${formatType(
                            resistance.name
                          )} col s3 center`}
                        >
                          {resistance.name}
                        </span>
                      ) : null
                    )}
                  </div>
                </section>
              </div>
            </div>
            {/* Bloc évolution */}
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
                                src={
                                  isShiny
                                    ? preEvo.sprites.shiny
                                    : preEvo.sprites.regular
                                }
                                alt={preEvo.name.fr}
                                className="round-image responsive-img"
                              />
                            </div>
                            <div className="section">
                              <h5>
                                {preEvo.name.fr}{" "}
                                <span style={{ color: colorNumber }}>
                                  N°{preEvo.pokedexId}
                                </span>
                              </h5>
                              <div>
                                {preEvo.types.map((type, index) => (
                                  <span
                                    key={index}
                                    className={formatType(type.name)}
                                  >
                                    {type.name}
                                    <img src={type.image} alt={type.name} className="responsive-img" />
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          {preEvo.evolution &&
                            preEvo.evolution.next &&
                            preEvo.evolution.next.length > 0 && (
                              <i className="large material-icons">
                                chevron_right
                              </i>
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
                        <span style={{ color: colorNumber }}>
                          N°{pokemon.pokedexId}
                        </span>
                      </h5>
                      <div>
                        {pokemon.types.map((type, index) => (
                          <span key={index} className={formatType(type.name)}>
                            {type.name} <img src={type.image} alt={type.name} className="responsive-img"/>
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
                                src={
                                  isShiny
                                    ? nextEvo.sprites.shiny
                                    : nextEvo.sprites.regular
                                }
                                alt={nextEvo.name.fr}
                                className="round-image responsive-img"
                              />
                            </div>
                            <div className="section">
                              <h5>
                                {nextEvo.name.fr}{" "}
                                <span style={{ color: colorNumber }}>
                                  N°{nextEvo.pokedexId}
                                </span>
                              </h5>
                              <div>
                                {nextEvo.types.map((type, index) => (
                                  <span
                                    key={index}
                                    className={formatType(type.name)}
                                  >
                                    {type.name}
                                    <img src={type.image} alt={type.name} className="responsive-img"/>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          {nextEvo.evolution &&
                            nextEvo.evolution.next &&
                            nextEvo.evolution.next.length > 0 && (
                              <i className="large material-icons">
                                chevron_right
                              </i>
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
          </div>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
};

export default PokemonsDetail;
